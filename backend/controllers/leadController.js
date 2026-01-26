
const Lead = require("../models/Lead");


exports.createLead = async (req, res) => {
  try {
    const { email, name, phone, message, source } = req.body;

    // 🔍 Check if lead already exists
    const existingLead = await Lead.findOne({ email });

    if (existingLead) {
      // 📝 Add note instead of creating duplicate
      existingLead.notes.push({
        text: "User submitted the contact form again",
      });

      // Optional: update message / phone if changed
      if (phone) existingLead.phone = phone;
      if (message) existingLead.message = message;

      await existingLead.save();

      return res.status(200).json({
        success: true,
        message: "Lead already exists, updated successfully",
        data: existingLead,
      });
    }

    // ✅ Create new lead if email not found
    const lead = await Lead.create({
      name,
      email,
      phone,
      message,
      source,
      status: "new",
    });

    res.status(201).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getAllLeads = async(req,res)=> {
    try{
        const leads = await Lead.find().sort({createdAt:-1});
        res.status(200).json({
            success: true,
            data: leads,
        })
    } catch(error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getLeadById = async(req,res)=> {
    try{
        const lead = await Lead.findById(req.params.id);

        if(!lead) {
           return res.status(404).json({
                success: false,
                message: "Lead not found",
            })
        }

        res.status(200).json({
            success: true,
            data: lead,
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.updateLead = async( req, res)=> {
    try{
        const {id} =  req.params;
        const {status, note} = req.body;

        if(!status && !note) {
            return res.status(400).json({
                message: "provide status or notes to update",
                success: false
            })
        }

        const lead = await Lead.findById(id);

        if(!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found",
            })
        }

        if(status) {
            lead.status = status
        }

        if(note) {
            lead.notes.push({text: note})
        }

        await lead.save();

        res.status(200).json({
            success: true,
            message: "Lead updated successfully",
            data: lead
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getLeadStats = async(req,res)=> {
    try{
        const total = await Lead.countDocuments();
        const newLeads = await Lead.countDocuments({status: "new"});
        const contacted = await Lead.countDocuments({status: "contacted"});
        const converted = await Lead.countDocuments({status: "converted"});

        res.status(200).json({
            success: true,
            data: {
                total,
                new: newLeads,
                contacted,
                converted,
            }
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    await lead.deleteOne();

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
