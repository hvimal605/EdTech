const Tag = require('../models/tags')

//create tag ka handler function
exports.createTag = async (req, res) => {
    try {
        //fetch data
        const { name, description } = req.body;

        // validaytion
        if (!name || !description) {

            return res.status(400).json({
                suceess: false,
                message: "All fields are required"
            })


        }

        //create entry in DB
        const tagDetails = await Tag.create({
            name: name,
            description: description
        })
        console.log(tagDetails)
        return res.status(200).json({
            success: true,
            messsage: 'Tag created successfully '
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//getAlltags handler function

exports.showAlltags = async (req,res)=>{
    try{
        const allTags = await Tag.find({},{name:true,description:true});
        res.status(200).json({
            success:true,
            message:"All tags returned Successfully "
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

    
}
