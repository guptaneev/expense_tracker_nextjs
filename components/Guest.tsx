import { SignInButton } from "@clerk/nextjs";

const Guest = () => {
    return (<div className="guest">
        <h1>Welcome to Expense Tracker</h1>
        <p>Track your expenses and create</p>
        <SignInButton />
    </div>  );
}
 
export default Guest;