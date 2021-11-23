

import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import BasicLayout from '../../layout/BasicLayout';
import * as applicationStore from '../../features/application/applicationSlice';
import './LandingPage.css';
import { Navigate, useNavigate } from "react-router-dom";
import { InvestorApplicationRequest, InvestorApplicationResponse } from '../../features/application/applicationAPI';
import MarketingCopy from '../../components/MarketingCopy';

const LandingPage = () =>
{
    const applicationForm = useAppSelector(applicationStore.selectForm);
    const applicationResult = useAppSelector(applicationStore.selectResult);
    const applicationStatus = useAppSelector(applicationStore.selectStatus);
    const applicationErrorMessage = useAppSelector(applicationStore.selectErrorMessage);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [showInvalidFields, setShowInvalidFields] = useState<boolean>(false);

    let investmentTypes = ["", "Stocks", "Bonds", "Real Estate"];

    function formDisabled()
    {
        return applicationStatus === 'loading';
    }

    function validForm()
    {
        return investmentAmountValid() && investmentTypeValid() && totalNetWorthValid() && yearlyIncomeValid() && creditScoreValid();
    }

    function getAmount(text: string | undefined): number | undefined
    {
        if (text === undefined)
        {
            return undefined
        }
        let retVal = Number(text);
        if (isNaN(retVal))
        {
            return undefined;
        } else
        {
            return retVal;
        }
    }

    function validCurrency(text: string)
    {
        var regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
        return (regex.test(text));
    }

    function investmentTypeValid()
    {
        return investmentTypes.indexOf(applicationForm.investmentType.trim()) > 0;
    }

    function totalNetWorthValid()
    {
        let amount = getAmount(applicationForm.totalNetWorth);
        return amount !== undefined && validCurrency(applicationForm.totalNetWorth!);
    }

    function yearlyIncomeValid()
    {
        let amount = getAmount(applicationForm.yearlyIncome);
        return amount !== undefined && amount > 0 && validCurrency(applicationForm.yearlyIncome!);
    }

    function creditScoreValid()
    {
        let amount = getAmount(applicationForm.creditScore);
        return amount !== undefined && amount >= 300 && amount <= 850;
    }

    function investmentAmountValid()
    {
        let amount = getAmount(applicationForm.investmentAmount);
        return amount !== undefined && amount > 0 && validCurrency(applicationForm.investmentAmount!);
    }

    function createInvestorApplicationRequest(): InvestorApplicationRequest
    {
        return new InvestorApplicationRequest(
            Number(applicationForm.investmentAmount!),
            applicationForm.investmentType,
            Number(applicationForm.totalNetWorth),
            Number(applicationForm.yearlyIncome),
            Number(applicationForm.creditScore)
        );
    }

    async function handleSubmit()
    {
        setShowInvalidFields(true);
        if (validForm())
        {
            dispatch(applicationStore.applyAsync(createInvestorApplicationRequest())).then(result =>
            {
                const payload = result.payload as InvestorApplicationResponse;
                if (payload !== undefined && payload.qualify)
                {
                    navigate("/success", { replace: false });
                }
            });
        }
    }

    if (applicationResult !== undefined && applicationResult.qualify === false) 
    {
        return <Navigate to="/disqualification" />
    }

    return <BasicLayout>

        <div className="form-group">
            <label>Investment Amount: </label>

            <input
                id="investment-amount"
                placeholder="Enter investment amount"
                className="form-control"
                defaultValue={applicationForm.investmentAmount}
                disabled={formDisabled()}
                onChange={(value) => dispatch(applicationStore.setInvestmentAmount(value.target.value))}
            />

            {showInvalidFields && investmentAmountValid() === false &&
                <div className="invalid-feedback">
                    Please provide a valid investment amount.
                </div>}
        </div>

        <div className="form-group">
            <label>Investment Type: </label>
            <select
                disabled={formDisabled()}
                value={applicationForm.investmentType}
                className="form-control"
                id="investment-type"
                onChange={(value) => dispatch(applicationStore.setInvestmentType(value.target.value))}>

                {investmentTypes.map(investmentType => <option key={investmentType} value={investmentType}>{investmentType}</option>)}

            </select>

            {showInvalidFields && investmentTypeValid() === false &&
                <div className="invalid-feedback">
                    Please select valid investment type.
                </div>}
        </div>

        <div className="form-group">
            <label>Total Net Worth: </label>

            <CurrencyInput
                id="total-net-worth"
                placeholder="Enter total net worth"
                className="form-control"
                disabled={formDisabled()}
                defaultValue={applicationForm.totalNetWorth}
                decimalsLimit={2}
                onValueChange={(value, name) => dispatch(applicationStore.setTotalNetWorth(value))} />

            {showInvalidFields && totalNetWorthValid() === false &&
                <div className="invalid-feedback">
                    Please provide a valid total net worth.
                </div>}
        </div>

        <div className="form-group">
            <label>Yearly Income: </label>
            <CurrencyInput
                id="yearly-income"
                placeholder="Enter yearly income"
                className="form-control"
                disabled={formDisabled()}
                defaultValue={applicationForm.yearlyIncome}
                decimalsLimit={2}
                onValueChange={(value, name) => dispatch(applicationStore.setYearlyIncome(value))} />

            {showInvalidFields && yearlyIncomeValid() === false &&
                <div className="invalid-feedback">
                    Please provide a valid yearly income.
                </div>}
        </div>

        <div className="form-group">
            <label>Credit Score (Number from 300-850)</label>
            <input
                className="form-control"
                id="credit-score-id"
                placeholder="Enter credit score"
                type="number" min={300} max={850}
                value={applicationForm.creditScore}
                disabled={formDisabled()}
                onChange={(value) => dispatch(applicationStore.setCreditScore(value.target.value))} />

            {showInvalidFields && creditScoreValid() === false &&
                <div className="invalid-feedback">
                    Please provide a valid credit score.
                </div>}
        </div>

        {
            applicationErrorMessage &&
            <div>
                {applicationErrorMessage}
            </div>
        }

        <div>
            <button disabled={formDisabled()} type="button" className={validForm() ? 'btn btn-lg btn-success' : 'btn btn-lg btn-danger'} onClick={() => handleSubmit()}>Submit</button>
            {applicationStatus === 'loading' &&
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
            }
        </div>

        <MarketingCopy />
    </BasicLayout>;
}

export default LandingPage;