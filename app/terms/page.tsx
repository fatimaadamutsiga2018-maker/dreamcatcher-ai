import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | ClarityPath',
  description: 'Terms of Service for ClarityPath by DreamCatcher AI',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-emerald-50/30 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border-2 border-slate-100 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Terms of Service</h1>
          <p className="text-slate-500 mb-8">Last updated: March 16, 2026</p>

          <div className="prose prose-slate max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using ClarityPath at{' '}
              <a href="https://dreamcatcherai.us" className="text-emerald-600 hover:text-emerald-700">
                dreamcatcherai.us
              </a>{' '}
              (&quot;the Service&quot;), operated by DreamCatcher AI, you agree to be bound by these Terms of
              Service. If you do not agree, please do not use the Service.
            </p>

            <h2>2. Description of Service</h2>
            <p>ClarityPath provides:</p>
            <ul>
              <li><strong>Energy Assessment</strong> — A personality and energy profile evaluation based on Eastern wisdom and modern psychology</li>
              <li><strong>Decision Guidance</strong> — Hexagram-based insights to support your decision-making process</li>
              <li><strong>Daily Energy</strong> — Daily energy trend information</li>
              <li><strong>Blog</strong> — Educational content on energy, timing, alignment, and guidance</li>
            </ul>

            <h2>3. Important Disclaimer</h2>
            <p>
              <strong>
                ClarityPath is designed for reflection and inspiration only. Our assessments and guidance
                readings are not professional advice and should not be used as the basis for financial,
                medical, legal, or gambling decisions. You are the final decision-maker in all matters
                concerning your life.
              </strong>
            </p>

            <h2>4. Account Registration</h2>
            <p>To access certain features, you must create an account. You agree to:</p>
            <ul>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access to your account</li>
              <li>Accept responsibility for all activities that occur under your account</li>
            </ul>

            <h2>5. Pricing and Payments</h2>

            <h3>5.1 Free Features</h3>
            <p>
              Energy Assessment is available for free. New users receive 10 bonus points upon registration,
              which can be used for Decision Guidance readings.
            </p>

            <h3>5.2 Paid Features</h3>
            <p>Decision Guidance readings beyond bonus points require either:</p>
            <ul>
              <li><strong>Reading Credits</strong> — One-time purchase packages valid for 90 days from purchase</li>
              <li><strong>Membership</strong> — Monthly or yearly subscription with unlimited readings</li>
            </ul>

            <h3>5.3 Payment Processing</h3>
            <p>
              All payments are processed by Creem, our merchant of record. By making a purchase, you also
              agree to Creem&apos;s terms of service. Prices are listed in USD and include applicable taxes.
            </p>

            <h3>5.4 Refund Policy</h3>
            <p>
              Due to the digital nature of our products, refunds are handled on a case-by-case basis.
              If you are unsatisfied with your purchase, please contact us at{' '}
              <a href="mailto:support@dreamcatcherai.us" className="text-emerald-600 hover:text-emerald-700">
                support@dreamcatcherai.us
              </a>{' '}
              within 7 days of purchase.
            </p>

            <h3>5.5 Subscription Cancellation</h3>
            <p>
              You may cancel your membership at any time. Upon cancellation, you will retain access to
              membership benefits until the end of your current billing period. No partial refunds are
              provided for unused time.
            </p>

            <h2>6. Credit Expiration</h2>
            <p>
              Purchased reading credits expire 90 days after purchase. Bonus points do not expire as
              long as your account remains active. Expired credits cannot be refunded or reinstated.
            </p>

            <h2>7. Intellectual Property</h2>
            <p>
              All content on ClarityPath, including but not limited to text, graphics, logos, algorithms,
              hexagram interpretations, assessment methodologies, and blog articles, is the property of
              DreamCatcher AI and is protected by applicable intellectual property laws.
            </p>
            <p>You may not:</p>
            <ul>
              <li>Copy, modify, or distribute our content without written permission</li>
              <li>Use our content for commercial purposes</li>
              <li>Reverse-engineer our assessment algorithms or scoring systems</li>
            </ul>

            <h2>8. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Interfere with or disrupt the Service or its infrastructure</li>
              <li>Use automated tools to scrape or extract data from the Service</li>
              <li>Create multiple accounts to abuse free bonus points</li>
            </ul>

            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, DreamCatcher AI shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages, including but not
              limited to loss of profits, data, or other intangible losses, resulting from your use
              of or inability to use the Service.
            </p>
            <p>
              Our total liability for any claim arising from the Service shall not exceed the amount
              you paid to us in the 12 months preceding the claim.
            </p>

            <h2>10. Service Availability</h2>
            <p>
              We strive to maintain continuous availability but do not guarantee uninterrupted access.
              We reserve the right to modify, suspend, or discontinue any part of the Service at any
              time with reasonable notice.
            </p>

            <h2>11. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account if you violate these Terms.
              You may also delete your account at any time by contacting us. Upon termination, your
              right to use the Service ceases, and unused credits or membership time may be forfeited.
            </p>

            <h2>12. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. We will notify users of significant changes
              by posting a notice on our website. Continued use of the Service after changes constitutes
              acceptance of the updated Terms.
            </p>

            <h2>13. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws. Any
              disputes arising from these Terms shall be resolved through good-faith negotiation first,
              and if necessary, through binding arbitration.
            </p>

            <h2>14. Contact Us</h2>
            <p>
              For questions about these Terms of Service, please contact us at:{' '}
              <a href="mailto:support@dreamcatcherai.us" className="text-emerald-600 hover:text-emerald-700">
                support@dreamcatcherai.us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
