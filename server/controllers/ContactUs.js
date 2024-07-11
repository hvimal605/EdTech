const { contactUsEmail } = require("../mail/temlates/contactFormRes")
const {queryNotify} = require("../mail/temlates/QueryNotify")
const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  console.log(req.body)
  try {
    const emailRes = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )
    const emailResforTeam = await mailSender(
        "trialevent965@gmail.com",
        "New Query ",
        queryNotify(email, firstname, lastname, message, phoneNo, countrycode)
      )
    console.log("Email Res ", emailRes)
    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}