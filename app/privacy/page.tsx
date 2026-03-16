import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | ClarityPath',
  description: 'Privacy Policy for ClarityPath by DreamCatcher AI',
};

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-slate-500 mb-8">Last updated: March 16, 2026</p>

          <div className="prose prose-slate max-w-none">
            <h2>1. Introduction</h2>
            <p>
              ClarityPath (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operated by DreamCatcher AI, provides
              an energy assessment and decision guidance web application at{' '}
              <a href="https://dreamcatcherai.us" className="text-emerald-600 hover:text-emerald-700">
                dreamcatcherai.us
              </a>
              . This Privacy Policy explains how we collect, use, and protect your personal information.
            </p>

            <h2>2. Information We Collect</h2>

            <h3>2.1 Account Information</h3>
            <p>When you create an account, we collect:</p>
            <ul>
              <li>Email address</li>
              <li>Name (if provided via OAuth)</li>
              <li>Profile information from third-party login providers (Google, GitHub) if you choose to sign in with them</li>
            </ul>

            <h3>2.2 Assessment and Reading Data</h3>
            <p>When you use our services, we collect:</p>
            <ul>
              <li>Energy Assessment responses and results</li>
              <li>Decision Guidance reading history and results</li>
              <li>Questions you submit for guidance readings</li>
            </ul>

            <h3>2.3 Payment Information</h3>
            <p>
              Payment processing is handled by our payment provider, Creem. We do not store your credit card
              numbers or full payment details. We receive and store:
            </p>
            <ul>
              <li>Transaction records (amounts, dates, product purchased)</li>
              <li>Subscription status</li>
              <li>Customer ID from the payment provider</li>
            </ul>

            <h3>2.4 Automatically Collected Information</h3>
            <p>We may automatically collect:</p>
            <ul>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>IP address</li>
              <li>Pages visited and usage patterns</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul>
              <li>Provide and improve our energy assessment and decision guidance services</li>
              <li>Process payments and manage your account balance (credits, bonus points, membership)</li>
              <li>Display your reading history and account dashboard</li>
              <li>Send important account-related notifications</li>
              <li>Maintain and improve the security of our platform</li>
            </ul>

            <h2>4. Data Storage and Security</h2>
            <p>
              Your data is stored securely using Supabase (PostgreSQL database) with row-level security
              policies. We use industry-standard encryption for data in transit (HTTPS/TLS) and implement
              access controls to protect your information.
            </p>

            <h2>5. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li><strong>Creem</strong> — Payment processing</li>
              <li><strong>Supabase</strong> — Database and authentication infrastructure</li>
              <li><strong>Vercel</strong> — Application hosting</li>
              <li><strong>Google / GitHub</strong> — Optional OAuth login providers</li>
            </ul>
            <p>
              Each third-party service has its own privacy policy. We encourage you to review their policies.
            </p>

            <h2>6. Data Sharing</h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties. We may share
              information only:
            </p>
            <ul>
              <li>With payment processors to complete transactions</li>
              <li>When required by law or legal process</li>
              <li>To protect our rights, privacy, safety, or property</li>
            </ul>

            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and associated data</li>
              <li>Export your data in a portable format</li>
            </ul>
            <p>
              To exercise these rights, contact us at{' '}
              <a href="mailto:support@dreamcatcherai.us" className="text-emerald-600 hover:text-emerald-700">
                support@dreamcatcherai.us
              </a>
              .
            </p>

            <h2>8. Cookies</h2>
            <p>
              We use essential cookies for authentication and session management. These are necessary
              for the application to function and cannot be disabled.
            </p>

            <h2>9. Children&apos;s Privacy</h2>
            <p>
              ClarityPath is not intended for users under the age of 18. We do not knowingly collect
              personal information from children.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify users of significant
              changes by posting a notice on our website. Continued use of the service after changes
              constitutes acceptance of the updated policy.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:{' '}
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
