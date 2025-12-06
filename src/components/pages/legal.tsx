"use client";

export function LegalPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
       <div className="container mx-auto px-6 max-w-7xl">
         <div className="max-w-4xl mx-auto">
           <h1 className="text-5xl font-black tracking-tighter mb-4">PRIVACY POLICY</h1>
           <p className="text-muted-foreground mb-12">Last Updated: January 1, 2025</p>

           <div className="grid md:grid-cols-12 gap-12">
             {/* Content */}
             <div className="md:col-span-8 prose prose-gray dark:prose-invert max-w-none">
               <h3>1. Introduction</h3>
               <p>
                 AVSTECH Inc. ("we," "our," or "us") is committed to protecting your privacy. 
                 This Privacy Policy explains how your personal information is collected, used, 
                 and disclosed by AVSTECH Inc.
               </p>
               
               <h3>2. Information We Collect</h3>
               <p>
                 We collect information you provide directly to us, such as when you create 
                 or modify your account, request on-demand services, contact customer support, 
                 or otherwise communicate with us. This information may include: name, email, 
                 phone number, postal address, profile picture, payment method, and other 
                 information you choose to provide.
               </p>

               <h3>3. How We Use Your Information</h3>
               <p>
                 We use the information we collect to provide, maintain, and improve our services, 
                 such as to:
               </p>
               <ul>
                 <li>Perform internal operations necessary to provide our services;</li>
                 <li>Authenticate users;</li>
                 <li>Send you administrative messages and receipts;</li>
                 <li>Monitor and analyze trends and usage.</li>
               </ul>

               <h3>4. Security</h3>
               <p>
                 We take reasonable measures to help protect information about you from loss, 
                 theft, misuse and unauthorized access, disclosure, alteration and destruction.
               </p>
             </div>

             {/* Sticky Sidebar */}
             <div className="hidden md:block md:col-span-4">
               <div className="sticky top-32 border-l border-border pl-6">
                 <h4 className="font-bold uppercase text-sm mb-4">Table of Contents</h4>
                 <ul className="space-y-3 text-sm text-muted-foreground">
                   <li className="hover:text-primary cursor-pointer">1. Introduction</li>
                   <li className="hover:text-primary cursor-pointer">2. Information Collection</li>
                   <li className="hover:text-primary cursor-pointer">3. Usage of Data</li>
                   <li className="hover:text-primary cursor-pointer">4. Security Protocols</li>
                   <li className="hover:text-primary cursor-pointer">5. User Rights</li>
                   <li className="hover:text-primary cursor-pointer">6. Contact Us</li>
                 </ul>
               </div>
             </div>
           </div>
         </div>
       </div>
    </div>
  );
}