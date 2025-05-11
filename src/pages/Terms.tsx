
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="min-h-screen bg-appbg">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
            <CardDescription>Last updated: May 11, 2025</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to RentMate. These Terms of Service govern your use of our website and services. 
              By accessing or using RentMate, you agree to be bound by these Terms.
            </p>
            
            <h2>2. User Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate and complete information.
              You are responsible for safeguarding the password and for all activities that occur under your account.
            </p>
            
            <h2>3. User Responsibilities</h2>
            <p>
              When listing items for rent, you agree that:
            </p>
            <ul>
              <li>You own the item or have permission to list it for rent</li>
              <li>The item is in the condition described in the listing</li>
              <li>You will honor reservations made through our platform</li>
              <li>You will communicate promptly with renters</li>
            </ul>
            
            <h2>4. Platform Rules</h2>
            <p>
              Users of RentMate agree not to:
            </p>
            <ul>
              <li>Post false, inaccurate, or misleading content</li>
              <li>Engage in any illegal activities through our platform</li>
              <li>Circumvent our fee structure or payment system</li>
              <li>Harass or harm other users</li>
            </ul>
            
            <h2>5. Payment and Fees</h2>
            <p>
              RentMate charges service fees for transactions conducted on our platform.
              These fees will be clearly displayed before you complete any transaction.
            </p>
            
            <h2>6. Cancellations and Refunds</h2>
            <p>
              Cancellation policies are set by item owners. RentMate may mediate disputes
              but ultimately owners determine their own policies within our guidelines.
            </p>
            
            <h2>7. Liability Limitations</h2>
            <p>
              RentMate serves as a platform connecting renters and owners. We are not responsible
              for the condition of items, user behavior, or transaction outcomes beyond our platform fees.
            </p>
            
            <h2>8. Privacy</h2>
            <p>
              Our Privacy Policy explains how we collect, use, and protect your personal information.
              By using RentMate, you agree to our data practices as described in the Privacy Policy.
            </p>
            
            <h2>9. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. We will notify users of significant changes.
              Your continued use of RentMate after changes constitutes acceptance of the updated Terms.
            </p>
            
            <h2>10. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at support@rentmate.com.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
