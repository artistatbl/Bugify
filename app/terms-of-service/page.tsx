import Nav from '@/components/layout/nav'
import React, { Suspense } from 'react'
import NavBar from '@/components/layout/nav'
import { Code } from '@radix-ui/themes'
const page = () => {
  return (
	<>
	<Suspense fallback="...">
	<NavBar
	 />
	</Suspense>
	<div className="w-full py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto prose max-w-none md:max-w-3xl lg:max-w-[900px]">
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mt-20 '>Terms of Service</h1>
          <p className='border-t border-gray-950'>
            Please read these terms of service ("terms", "terms of service") carefully before using our website (the
            "service") operated by Shadcn ("us", "we", "the company").
          </p>
          <p >
            Your access to and use of the service is conditioned on your acceptance of and compliance with these terms.
            These terms apply to all visitors, users and others who access or use the service.
          </p>
          <h2>
            By accessing or using the service you agree to be bound by these terms. If you disagree with any part of the
            terms then you may not access the service.
          </h2>
          <h2 >Introduction</h2>
          <p>
            These terms and conditions ("terms", "terms and conditions") are an agreement between Shadcn ("us", "we", or
            "our") and you ("user", "you" or "your"). This agreement sets forth the general terms and conditions of your
            use of the Shadcn website and any of its products or services (collectively, "website" or "services").
          </p>
          <h2 className='border-t border-gray-950'>Acceptance of Terms</h2>
          <p>
            By accessing this website, you are agreeing to be bound by these website terms and conditions of use, all
            applicable laws and regulations, and agree that you are responsible for compliance with any applicable local
            laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The
            materials contained in this website are protected by applicable copyright and trademark law.
          </p>
          <h2 className='border-t border-gray-950'>User Responsibilities</h2>
          <p>
            In these terms and conditions, "your user content" means material (including without limitation text,
            images, audio material, video material and audio-visual material) that you submit to this website, for
            whatever purpose. You grant to Shadcn a worldwide, irrevocable, non-exclusive, royalty-free license to use,
            reproduce, adapt, publish, translate and distribute your user content in any existing or future media. You
            also grant to Shadcn the right to sub-license these rights, and the right to bring an action for
            infringement of these rights.
          </p>
          <h2 className='border-t border-gray-950'>Intellectual Property</h2>
          <p>
            This agreement does not transfer from Shadcn to you any Shadcn or third party intellectual property, and all
            right, title, and interest in and to such property will remain (as between the parties) solely with Shadcn.
            Shadcn, the Shadcn logo, and all other trademarks, service marks, graphics and logos used in connection with
            Shadcn, or the website are trademarks or registered trademarks of Shadcn or Shadcn licensors. Other
            trademarks, service marks, graphics and logos used in connection with the website may be the trademarks of
            other third parties. Your use of the website grants you no right or license to reproduce or otherwise use
            any Shadcn or third-party trademarks.
          </p>
          <h2 className='border-t border-gray-950'>Privacy Policy</h2>
          <p>
            Your use of the website is also subject to the terms and conditions of the Shadcn privacy policy, which is
            incorporated by reference into these terms and conditions. The Shadcn privacy policy is available at
            https://shadcn.com/privacy.
          </p>
          <h2 className='border-t border-gray-950'>Limitation of Liability</h2>
          <p>
            In no event shall Shadcn, nor its directors, employees, partners, agents, suppliers, or affiliates, be
            liable for any indirect, incidental, special, consequential or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access
            to or use of or inability to access or use the website; (ii) any conduct or content of any third party on
            the website; (iii) any content obtained from the website; and (iv) unauthorized access, use or alteration of
            your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other
            legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy
            set forth herein is found to have failed of its essential purpose.
          </p>
          <h2 className='border-t border-gray-950'>Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the website immediately, without prior notice or
            liability, under our sole discretion, for any reason whatsoever and without limitation, including but not
            limited to a breach of the terms. If you wish to terminate your account, you may simply discontinue using
            the website. All provisions of the terms which by their nature should survive termination shall survive
            termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and
            limitations of liability.
          </p>
          <h2 className='border-t border-gray-950'>Governing Law and Jurisdiction</h2>
          <p>
            These terms shall be governed and construed in accordance with the laws of the State of us, without regard
            to its conflict of law provisions. Our failure to enforce any right or provision of these terms will not be
            considered a waiver of those rights. If any provision of these terms is held to be invalid or unenforceable
            by a court, the remaining provisions of these terms will remain in effect. These terms constitute the entire
            agreement between us regarding our website, and supersede and replace any prior agreements we might have had
            between us regarding the website.
          </p>
          <h2 className='border-t border-gray-950'>Changes to the Terms</h2>
          <p>
            We reserve the right to modify these terms from time to time at our sole discretion. Therefore, you should
            review these page periodically. When we change the terms in a material manner, we will notify you that
            material changes have been made to the terms. Your continued use of the website after any such change
            constitutes your acceptance of the new terms. If you do not agree to any of these terms or any future
            version of the terms, do not use or access (or continue to access) the website.
          </p>
          <h2 className='border-t border-gray-950'>Contact Information</h2>
          <p>If you have any questions about these terms, please contact us.</p>
          <ul>
            <li>By email: contact@shadcn.com</li>
            <li>By visiting this page on our website: (`https://shadcn.com/contact)</li>
          </ul>
		<h3 className='font-light text-sm text-gray-500 mt-10'>
			Last Update: September 27, 2022
			<Code size='7'>Console.log</Code>
		</h3>
        </div>
      </div>
    </div>
	
	</>
  )
}

export default page