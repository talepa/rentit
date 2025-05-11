
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-appbg">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
            <CardDescription>Last updated: May 11, 2025</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, 
              list items, make bookings, or contact customer support. This may include:
            </p>
            <ul>
              <li>Contact information (name, email address, phone number)</li>
              <li>Account credentials (username, password)</li>
              <li>Profile information (profile photo, biography)</li>
              <li>Payment details (processed securely through our payment providers)</li>
              <li>Communications with other users and with RentMate</li>
              <li>Device and usage information when you use our website</li>
            </ul>
            
            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Improve our services and develop new features</li>
              <li>Monitor and analyze trends and usage</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            </ul>
            
            <h2>3. Sharing Your Information</h2>
            <p>
              We may share your information with:
            </p>
            <ul>
              <li>Other users as necessary for transactions (e.g., sharing contact info between renters and owners)</li>
              <li>Service providers who perform services on our behalf</li>
              <li>Third parties if we believe disclosure is required by law</li>
              <li>Other parties with your consent</li>
            </ul>
            
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information.
              However, no method of transmission over the Internet is 100% secure, and we cannot 
              guarantee absolute security.
            </p>
            
            <h2>5. Your Choices</h2>
            <p>
              You can update your account information and preferences at any time by logging into your account.
              You may also opt out of receiving promotional communications from us by following the instructions in those communications.
            </p>
            
            <h2>6. Children's Privacy</h2>
            <p>
              Our services are not directed to children under 13, and we do not knowingly collect personal information 
              from children under 13. If you become aware that a child has provided us with personal information, 
              please contact us.
            </p>
            
            <h2>7. Changes to this Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@rentmate.com.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
