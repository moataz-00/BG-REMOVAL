import { Webhook } from "svix";
import userModel from "../models/userModel.js";

const clerkWebhooks = async (req, res) => {
  try {
    // Create a svix instance with Clerk webhook secret.
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify webhook signature
    try {
      const payload = req.rawBody;
      await whook.verify(payload, {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
      });
    } catch (error) {
      return res.status(401).json({ success: false, message: "Webhook verification failed" });
    }

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses?.[0]?.email_address || "",
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModel.create(userData);
        return res.json({ success: true, message: "User created successfully" });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address || "",
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        return res.json({ success: true, message: "User updated successfully" });
      }

      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        return res.json({ success: true, message: "User deleted successfully" });
      }

      default:
        return res.status(400).json({ success: false, message: "Unknown event type" });
    }
  } catch (error) {
    console.log("Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { clerkWebhooks };