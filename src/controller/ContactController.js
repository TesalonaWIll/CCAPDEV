export const handleSend = () => {
    try {
        //alert
        alert("Message sent!");

        //reload page
        window.location.reload(false)

        //set to ""
        document.getElementById("c_firstName").value = "";
        document.getElementById("c_lastName").value = "";
        document.getElementById("c_email").value = "";
        document.getElementById("c_number").value = "";
        document.getElementById("c_message").value = "";
    } catch (error) {
        console.log(error);
        alert("Something went wrong! Unable to send message.");
    }
}

export const checkEmpty = () => {
    try {
        //get values
        const firstName = document.getElementById("c_firstName").value;
        const lastName = document.getElementById("c_lastName").value;
        const email = document.getElementById("c_email").value;
        const number = document.getElementById("c_number").value;
        const message = document.getElementById("c_message").value;

        //check if empty
        if (firstName === "" || lastName === "" || email === "" || number === "" || message === "") {
            alert("Please fill out all fields!");
        } else {
            handleSend();
        }
    } catch (error) {
        console.log(error);
        alert("Something went wrong! Unable to send message.");
    }
}
