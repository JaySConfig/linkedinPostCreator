// app/api/collect-email/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, post } = await request.json();
    
    // Validate input
    if (!email || !post) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email and post are required' 
      }, { status: 400 });
    }
    
    // Validate API key
    const apiKey = process.env.NEXT_SERVER_BREVO_API_KEY;
    if (!apiKey) {
      console.error('BREVO_API_KEY is not defined');
      return NextResponse.json({ 
        success: false, 
        error: 'API configuration error' 
      }, { status: 500 });
    }

    // Add contact to Brevo using their API directly
    const contactResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          LINKEDIN_POST: post.substring(0, 250),
          DATE_ADDED: new Date().toISOString()
        },
        listIds: [3]
      })
    });

    const contactData = await contactResponse.json();
    
    // Handle contact creation errors
    if (!contactResponse.ok) {
      // If contact already exists, this is not an error for us
      if (contactResponse.status === 400 && contactData.code === 'duplicate_parameter') {
        console.log(`Contact already exists: ${email}`);
        // Continue with sending the email even if contact already exists
      } else {
        console.error('Error creating contact:', contactData);
        return NextResponse.json({ 
          success: false, 
          error: 'Failed to store contact information' 
        }, { status: 500 });
      }
    }
    
    console.log(`Email added or already exists in Brevo: ${email}`);
    
    // Send transactional email
    const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        subject: "Your LinkedIn Post",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Your LinkedIn Post</h2>
            <p>Thanks for using our LinkedIn Post Generator!</p>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
              ${post.replace(/\n/g, '<br>')}
            </div>
            <p>Feel free to copy and paste this to LinkedIn!</p>
          </div>
        `,
        sender: { name: "LinkedIn Post Creator", email: "hello@linkedpostcreator.com" },
        to: [{ email: email }]
      })
    });
    
    if (!emailResponse.ok) {
      const emailData = await emailResponse.json();
      console.error('Error sending email:', emailData);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to send email' 
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Email collected and confirmation sent'
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process request', 
      details: error.message 
    }, { status: 500 });
  }
}