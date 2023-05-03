function PrivacyPolicy() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Personal Data We Collect</h2>
      <p className="mb-4">
        When you use our Site, we collect the following types of personal data:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>
          a. Account Information: When you create an account, we collect your username and email address.
        </li>
        <li>
          b. Uploaded Books: When you upload a book for sale, we collect the book's title, description, author, seller, image, and price.
        </li>
        <li>
          c. Wishlist: When you add a book to your wishlist, we collect information about the book.
        </li>
        <li>
          d. Browsing History: We collect information about the books you browse on our Site to provide recommendations.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Purpose and Legal Basis for Processing</h2>
      <p className="mb-4">
        We process your personal data for the following purposes and based on the following legal bases:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>
          a. Account Management: We process your account information to provide you access to the Site and its features. The legal basis for this processing is the performance of a contract.
        </li>
        <li>
          b. Uploaded Books: We process the data you provide when uploading a book to display it on the Site for demonstration purposes. The legal basis for this processing is your consent.
        </li>
        <li>
          c. Wishlist: We process your wishlist data to provide you with a personalised list of books you wish to purchase. The legal basis for this processing is your consent.
        </li>
        <li>
          d. Recommendations: We process your browsing history to provide you with personalised book recommendations. The legal basis for this processing is your consent.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Recipients of Personal Data</h2>
      <p className="mb-6">
        We may share your personal data with third-party service providers who assist us with the operation of the Site, such as hosting services. These service providers are contractually obligated to protect your personal data and use it only for the purposes for which it was disclosed.
      </p>

      <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
      <p className="mb-6">
        We retain your personal data for as long as necessary to fulfil the purposes for which it was collected, or until you request its deletion.
      </p>
      <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
        <p className="mb-4">
            Under the UK GDPR, you have the following rights:
        </p>
        <ul className="list-disc list-inside mb-6">
        <li>
            a. Right of access: You have the right to request a copy of your personal data held by us.
        </li>
        <li>
            b. Right to rectification: You have the right to request the correction of any inaccurate personal data we hold about you.
        </li>
        <li>
            c. Right to erasure: You have the right to request the deletion of your personal data, subject to certain conditions.
        </li>
        <li>
            d. Right to restrict processing: You have the right to request the restriction of the processing of your personal data in specific circumstances.
        </li>
        <li>
            e. Right to data portability: You have the right to request the transfer of your personal data to another organisation, where feasible.
        </li>
        <li>
            f. Right to object: You have the right to object to the processing of your personal data for certain purposes, such as direct marketing or profiling.
        </li>
        <li>
            g. Right to withdraw consent: If we process your personal data based on your consent, you have the right to withdraw that consent at any time.
        </li>
        </ul>
        <p className="mb-6">
        To exercise any of these rights, please contact us at the email address provided in section 1.
        </p>

        <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
        <p className="mb-6">
        We may update this Privacy Policy from time to time. Any changes will be effective immediately upon posting on the Site. Your continued use of the Site constitutes your acceptance of the updated Privacy Policy.
        </p>

        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        <p>
        If you have any questions or concerns about this Privacy Policy or our data processing practices, please contact
        </p>
    </div>
    );
};

export default PrivacyPolicy;