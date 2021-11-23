import { render, screen, fireEvent } from '../../../test-utils';
import LandingPage from '../LandingPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// https://github.com/nickcolley/jest-axe/issues/147
const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

// we have to wrap in routes cause navigate reference will throw exception
const renderPage = () => render(<Router>
    <Routes>
        <Route path="/" element={<LandingPage />} />
    </Routes>
</Router>);

test('simple setup test', () =>
{
    renderPage();

    expect(screen.getByText(/Investment Amount/i)).toBeInTheDocument();
});

test('test validation messages do not appear before they click button', () =>
{
    renderPage();
    expect(screen.queryByText(/Please provide a valid investment amount/i)).not.toBeInTheDocument();
});

test('test validation messages appear after they click button', () =>
{
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }))
    expect(screen.queryByText(/Please provide a valid investment amount/i)).toBeInTheDocument();
});

test('test valid investment amount not show warning', () =>
{
    const utils = renderPage();;
    const input = utils.container.querySelector('#investment-amount');
    fireEvent.change(input!, { target: { value: '124.00' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }))
    expect(screen.queryByText(/Please provide a valid investment amount/i)).not.toBeInTheDocument();
});

test('test invalid investment amount show warning', () =>
{
    const utils = renderPage();;
    const input = utils.container.querySelector('#investment-amount');
    fireEvent.change(input!, { target: { value: 'ABC.00' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }))
    expect(screen.queryByText(/Please provide a valid investment amount/i)).toBeInTheDocument();
});