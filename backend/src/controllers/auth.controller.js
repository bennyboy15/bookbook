export async function login(req,res) {
    console.log("LOGIN");
    res.status(200).json({message: "LOGIN"});
}

export async function register(req,res) {
    console.log("REGISTER");
    res.status(200).json({message: "REGISTER"});
}