/* Write a function called ***createAccount*** which creates a bank account given a PIN number and an initial deposit amount. 

The return value should be an object with four methods on it:

- ***checkBalance***: Given the correct PIN, return the current balance. (If the PIN is invalid, return “Invalid PIN.”)
- ***deposit***: Given the correct PIN and a deposit amount, increment the account balance by the amount. 
    (If the PIN is invalid, return “Invalid PIN.”)
- ***withdraw***: Given the correct PIN and a withdrawal amount, decrement the account balance by the amount. 
    You also shouldn’t be able to withdraw more than you have. (If the PIN is invalid, return “Invalid PIN.”)
- ***changePin***: Given the old PIN and a new PIN, change the PIN number to the new PIN. 
    (If the old PIN is invalid, return “Invalid PIN.”)*/

function createAccount(pin, amount = 0) {

    return {
        checkBalance(inputPin) {
            if (inputPin === pin) {
                return `$${amount}`;
            }

            return "Invalid PIN."
        },

        deposit(inputPin, depositAmount) {
            if (inputPin === pin) {
                amount += depositAmount;
                return `Succesfully deposited $${depositAmount}. Current balance: $${amount}.`;
            }

            return "Invalid PIN."
        },

        withdraw(inputPin, withdrawalAmount) {
            if (inputPin === pin) {
                if (withdrawalAmount <= amount) {
                    amount -= withdrawalAmount;
                    return `Succesfully withdrew $${withdrawalAmount}. Current balance: $${amount}.`;
                }

                return "Withdrawal amount exceeds account balance. Transaction cancelled.";
            }

            return "Invalid PIN."
        },

        changePin(inputPin, newPin) {
            if (inputPin === pin) {
                pin = newPin;
                return "PIN successfully changed!";
            }

            return "Invalid PIN."
        }
    };
}

module.exports = { createAccount };
