
export interface InvestorApplicationResponse
{

    qualify: boolean | undefined;
    disqualificationMessage: string | undefined;
    errorMessage: string | undefined;

}

export class InvestorApplicationRequest
{

    investmentAmount: number;
    investmentType: string;
    totalNetWorth: number;
    yearlyIncome: number;
    creditScore: number;

    constructor(investmentAmount: number, investmentType: string, totalNetWorth: number, yearlyIncome: number, creditScore: number)
    {
        this.investmentAmount = investmentAmount;
        this.investmentType = investmentType;
        this.totalNetWorth = totalNetWorth;
        this.yearlyIncome = yearlyIncome;
        this.creditScore = creditScore;
    }
}



export function postApplication(application: InvestorApplicationRequest)
{
    // ALL OF THESE RESPONSES ARE MOCKED TO BE REPLACED BY ACTUAL API CALL

    if (application.investmentAmount > 9000000)
    {
        return new Promise<{ data: InvestorApplicationResponse }>((resolve) =>
            setTimeout(() => resolve({
                data: {
                    qualify: undefined,
                    disqualificationMessage: undefined,
                    errorMessage: "Invalid input"
                }
            }), 500)
        );
    }

    if (application.investmentAmount * .2 > application.yearlyIncome)
    {
        return new Promise<{ data: InvestorApplicationResponse }>((resolve) =>
            setTimeout(() => resolve({
                data: {
                    qualify: false,
                    disqualificationMessage: "Investment amount yearly income.  Bacon ipsum dolor amet short ribs brisket venison rump drumstick pig sausage prosciutto chicken spare ribs salami picanha doner.",
                    errorMessage: undefined
                }
            }), 500)
        );
    }

    if (application.creditScore < 600)
    {
        return new Promise<{ data: InvestorApplicationResponse }>((resolve) =>
            setTimeout(() => resolve({
                data: {
                    qualify: false,
                    disqualificationMessage: "Credit score. Lorem ipsum dolor sit amet, eum no nobis dissentiunt. Eripuit pertinacia ut quo. Te enim persius urbanitas cum, ut ludus salutatus eos.",
                    errorMessage: undefined
                }
            }), 500)
        );
    }

    if (application.investmentAmount > application.totalNetWorth * .03)
    {
        return new Promise<{ data: InvestorApplicationResponse }>((resolve) =>
            setTimeout(() => resolve({
                data: {
                    qualify: false,
                    disqualificationMessage: "Investment amount net worth. Lorem ipsum dolor sit amet, graeco tractatos ne duo, vis luptatum percipitur no, adhuc indoctum maiestatis pri id.",
                    errorMessage: undefined
                }
            }), 500)
        );
    }

    return new Promise<{ data: InvestorApplicationResponse }>((resolve) =>
        setTimeout(() => resolve({
            data: {
                qualify: true,
                disqualificationMessage: undefined,
                errorMessage: undefined
            }
        }), 500)
    );
}
