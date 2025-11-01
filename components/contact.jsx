import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react'
import { useForm, ValidationError } from '@formspree/react'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(null)

  // Formspree integration
  // Replace the string below with your Formspree form ID (you provided "mwpwqrjd" in the snippet)
  const [formspreeState, submitToFormspree] = useForm('mwpwqrjd')

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setErrors((err) => ({ ...err, [e.target.name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const eobj = validate()
    setErrors(eobj)
    if (Object.keys(eobj).length) return

    setSubmitting(true)
    setSuccess(null)
    
    try {
      // Submit to Formspree
      await submitToFormspree(e)
      
      // Check if submission was successful
      // Note: formspreeState updates asynchronously, so we check after a brief delay
      setTimeout(() => {
        if (formspreeState?.succeeded) {
          setSuccess({ type: 'success', message: "Message sent successfully! I'll get back to you soon." })
          setForm({ name: '', email: '', message: '' })
        } else if (formspreeState?.errors && formspreeState.errors.length > 0) {
          setSuccess({ type: 'error', message: 'Submission failed. Please check your email address and try again.' })
        }
        setSubmitting(false)
      }, 500)
    } catch (err) {
      console.error('Form submission error:', err)
      setSuccess({ 
        type: 'error', 
        message: 'Unable to send message. Please email me directly at bassanagasurya@gmail.com' 
      })
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 scroll-mt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 -z-10"></div>
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-purple-100 rounded-full">
            <Mail className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700 uppercase tracking-wider">Get In Touch</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            Let's <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">Connect</span>
          </h2>
          
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to chat about technology? I'd love to hear from you. Drop me a message and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-start">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-2xl">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">Contact Information</h3>
              <p className="text-purple-100 mb-8 text-sm sm:text-base">Feel free to reach out through any of these channels</p>

              <ul className="space-y-6 mb-8">
                <li className="flex items-start gap-4 group">
                  <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl flex-shrink-0 group-hover:bg-white/20 transition-all duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-purple-100 mb-1">Email</p>
                    <a href="mailto:bassanagasurya@gmail.com" className="text-white hover:text-purple-200 transition-colors break-all text-sm sm:text-base">
                      bassanagasurya@gmail.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4 group">
                  <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl flex-shrink-0 group-hover:bg-white/20 transition-all duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-purple-100 mb-1">Phone</p>
                    <p className="text-white text-sm sm:text-base">Available on request</p>
                  </div>
                </li>

                <li className="flex items-start gap-4 group">
                  <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl flex-shrink-0 group-hover:bg-white/20 transition-all duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-purple-100 mb-1">Location</p>
                    <p className="text-white text-sm sm:text-base">India · Open to Remote</p>
                  </div>
                </li>
              </ul>

              {/* Social Links */}
              <div className="pt-6 border-t border-white/20">
                <p className="text-sm font-semibold text-purple-100 mb-4">Connect on Social</p>
                <div className="flex gap-3">
                  <a 
                    href="https://github.com/Nagasurya123" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cursor-target p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-110"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://linkedin.com/in/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="cursor-target p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://twitter.com/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cursor-target p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-110"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="mt-8 flex items-center justify-center">
                <div className="relative w-32 h-32 opacity-20">
                  <div className="absolute inset-0 bg-white rounded-full blur-2xl"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8 md:p-10 backdrop-blur-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    Full Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input 
                    id="name"
                    name="name" 
                    value={form.name} 
                    onChange={handleChange} 
                    className={`px-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm md:text-base ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-purple-300'}`}
                    placeholder="John Doe"
                  />
                  {errors.name && <span className="text-xs text-red-600 mt-2 flex items-center gap-1">⚠ {errors.name}</span>}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    Email Address
                    <span className="text-red-500">*</span>
                  </label>
                  <input 
                    id="email" 
                    name="email" 
                    type="email"
                    value={form.email} 
                    onChange={handleChange} 
                    className={`px-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm md:text-base ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-purple-300'}`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <span className="text-xs text-red-600 mt-2 flex items-center gap-1">⚠ {errors.email}</span>}
                  <ValidationError prefix="Email" field="email" errors={formspreeState.errors} />
                </div>
              </div>

              <div className="flex flex-col mt-6">
                <label htmlFor="message" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  Your Message
                  <span className="text-red-500">*</span>
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={form.message} 
                  onChange={handleChange} 
                  rows={6}
                  className={`px-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm md:text-base resize-none ${errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-purple-300'}`}
                  placeholder="Tell me about your project, question, or just say hi..."
                />
                {errors.message && <span className="text-xs text-red-600 mt-2 flex items-center gap-1">⚠ {errors.message}</span>}
                <ValidationError prefix="Message" field="message" errors={formspreeState.errors} />
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button 
                  type="submit" 
                  disabled={submitting || formspreeState.submitting} 
                  className="cursor-target group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-base shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">{submitting || formspreeState.submitting ? 'Sending...' : 'Send Message'}</span>
                  <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Success Message */}
                {(formspreeState.succeeded || (success && success.type === 'success')) && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl shadow-sm animate-in fade-in slide-in-from-left-5 duration-300">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm text-green-700 font-medium">
                      {success?.message || "Message sent successfully! I'll get back to you soon."}
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {success && success.type === 'error' && (
                  <div className="flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl shadow-sm animate-in fade-in slide-in-from-left-5 duration-300">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-red-700 font-medium mb-1">
                        {success.message}
                      </p>
                      <a 
                        href="mailto:bassanagasurya@gmail.com" 
                        className="text-xs text-red-600 hover:text-red-800 underline font-medium"
                      >
                        Click here to email directly
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Privacy Note */}
              <p className="mt-6 text-xs text-gray-500 text-center">
                Your information is secure and will never be shared with third parties.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact