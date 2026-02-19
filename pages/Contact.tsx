import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    condition: '',
    message: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
  setResponseMsg("Full Name is required.");
  return;
}

if (!formData.phone.trim()) {
  setResponseMsg("Phone Number is required.");
  return;
}

const phoneRegex = /^[0-9]{10}$/;

if (!phoneRegex.test(formData.phone)) {
  setResponseMsg("Enter a valid 10-digit phone number.");
  return;
}

if (!formData.condition.trim()) {
  setResponseMsg("Please select a Skin Condition.");
  return;
}


    const clientNumber = "919159385383"; // 🔥 CHANGE TO CLIENT NUMBER

    const whatsappMessage = `
New Consultation Request

Name: ${formData.name}
Phone: ${formData.phone}
Condition: ${formData.condition || "Not Selected"}
Message: ${formData.message || "No message provided"}
    `;

    const encodedMessage = encodeURIComponent(whatsappMessage);

    const whatsappURL = `https://wa.me/${clientNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");

    setFormData({
      name: '',
      phone: '',
      condition: '',
      message: ''
    });
  };

  return (
    <div className="pb-24">
      <section className="bg-soft-beige py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get in touch to book your personalized consultation at our Madurai clinic.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* FORM */}
          <div className="bg-white p-8 lg:p-12 rounded-3xl border border-gray-100 shadow-sm space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-herbal-green focus:ring-1 focus:ring-herbal-green outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9159385383"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-herbal-green focus:ring-1 focus:ring-herbal-green outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Skin Condition (Optional)
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-herbal-green focus:ring-1 focus:ring-herbal-green outline-none"
                >
                  <option value="">Select Condition</option>
                  <option>Psoriasis</option>
                  <option>Acne</option>
                  <option>Eczema</option>
                  <option>Fungal Infection</option>
                  <option>Other Allergy</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Message</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your concern briefly..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-herbal-green focus:ring-1 focus:ring-herbal-green outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-herbal-green text-white py-4 rounded-lg font-bold hover:bg-opacity-90 transition-all shadow-md"
              >
                Request Consultation
              </button>

            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-12">
            <div className="space-y-8">

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-soft-beige rounded-xl flex items-center justify-center text-herbal-green">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {CONTACT_INFO.hospitalName}
                  </h3>
                  <p className="text-gray-600 text-sm">{CONTACT_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-soft-beige rounded-xl flex items-center justify-center text-herbal-green">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600 text-sm">{CONTACT_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-soft-beige rounded-xl flex items-center justify-center text-herbal-green">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Clinic Working Hours</h3>
                  <p className="text-gray-600 text-sm">{CONTACT_INFO.workingHours}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
