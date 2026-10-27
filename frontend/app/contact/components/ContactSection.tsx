"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
export default function ContactSection() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        enquiryType: "",
        message: "",
    })

    const [submitted, setSubmitted] = useState(false)
    const [errorFields, setErrorFields] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const missing: string[] = []
        Object.entries(formData).forEach(([key, value]) => {
            if (!value.trim()) {
                const formatted = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
                missing.push(formatted)
            }
        })

        if (missing.length > 0) {
            setErrorFields(missing)
            setSubmitted(false)
            setErrorMessage("")
            return
        }

        setErrorFields([])
        setErrorMessage("")
        setIsLoading(true)

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setSubmitted(true)
                setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    enquiryType: "",
                    message: "",
                })
                setTimeout(() => setSubmitted(false), 5000)
            } else {
                const errorData = await response.json()
                setErrorMessage(errorData.error || "Failed to send message. Please try again.")
            }
        } catch (error) {
            console.error("Error submitting form:", error)
            setErrorMessage("Failed to send message. Please check your connection and try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-black text-white py-16 px-4 font-orbit">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="uppercase text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight">Reach Out to Us</h1>
                    <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-400 max-w-2xl mx-auto">
                        Got a question, idea, or collaboration in mind? Connect with our team directly via email — our team will be in touch soon.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* PREVIOUS UI (Original 5-Field Contact Form - Commented out for future reuse):
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="w-full"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="group">
                                <label htmlFor="fullName" className="...">Full Name</label>
                                <Input id="fullName" placeholder="ENTER YOUR NAME" ... />
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div><Input id="email" placeholder="EMAIL@EXAMPLE.COM" ... /></div>
                                <div><Input id="phone" placeholder="+91 00000 00000" ... /></div>
                            </div>
                            <div><Input id="enquiryType" placeholder="PARTNERSHIP / GENERAL / CAREERS" ... /></div>
                            <div><Textarea id="message" placeholder="TELL US ABOUT YOUR PROJECT..." ... /></div>
                            <button type="submit">Send Message</button>
                        </form>
                    </motion.div>
                    */}

                    {/* CURRENT UI (Direct Email Contact Card) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="w-full space-y-6"
                    >
                        <div className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-sm space-y-6">
                            <h2 className="text-xl font-bold uppercase tracking-wider text-[#5ce1e6] font-orbit">
                                Direct Contact Information
                            </h2>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Our form is currently offline for scheduled maintenance. Please send your inquiries directly to our team using the email address below.
                            </p>

                            <div className="pt-4 border-t border-zinc-800 space-y-4">
                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">
                                        Primary Email Address
                                    </span>
                                    <a
                                        href="mailto:info@tsallaaerospace.com"
                                        className="text-xl md:text-2xl font-bold text-white hover:text-[#5ce1e6] transition-colors tracking-tight font-orbit inline-block"
                                    >
                                        info@tsallaaerospace.com
                                    </a>
                                </div>

                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">
                                        Phone Support
                                    </span>
                                    <span className="text-base text-zinc-300 font-orbit">
                                        +91 95357 20540
                                    </span>
                                </div>

                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">
                                        Headquarters Location
                                    </span>
                                    <span className="text-base text-zinc-300 font-orbit">
                                        Bengaluru, Karnataka 560012, India
                                    </span>
                                </div>
                            </div>

                            <div className="pt-4">
                                <a
                                    href="mailto:info@tsallaaerospace.com"
                                    className="inline-flex items-center justify-center w-full h-12 bg-[#5ce1e6] text-black font-bold text-xs tracking-widest uppercase rounded-sm hover:bg-white transition-colors"
                                >
                                    Compose Email
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="w-full h-full min-h-[500px] lg:min-h-0 relative group overflow-hidden border border-zinc-800 rounded-sm"
                    >
                        <iframe
                            width="100%"
                            height="100%"
                            className="absolute inset-0 w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                            frameBorder="0"
                            title="map"
                            marginHeight={0}
                            marginWidth={0}
                            scrolling="no"
                            src="https://maps.google.com/maps?q=13.013616,77.568779&z=15&output=embed"
                        />
                        <div className="absolute inset-0 pointer-events-none border border-zinc-800/50 mix-blend-overlay"></div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="grid md:grid-cols-2 gap-6 mt-20 text-sm"
                >
                    <div className="bg-zinc-900/50 border border-zinc-800/50 p-8 rounded-sm hover:bg-zinc-900 transition-colors duration-300">
                        <h2 className="block text-sm mb-6 uppercase tracking-[0.2em] font-orbit font-bold text-white">Contact Us</h2>
                        <p className="mb-3 font-light text-sm font-orbit text-zinc-400 group">
                            <span className="font-semibold text-white block mb-1">Phone Number</span>
                            <span className="group-hover:text-white transition-colors">+91 95357 20540</span>
                        </p>
                        <p className="font-light text-sm font-orbit text-zinc-400 group">
                            <span className="font-semibold text-white block mb-1">Email Address</span>
                            <span className="group-hover:text-white transition-colors">info@tsallaaerospace.com</span>
                        </p>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800/50 p-8 rounded-sm hover:bg-zinc-900 transition-colors duration-300">
                        <h2 className="block text-sm mb-6 uppercase tracking-[0.2em] font-orbit font-bold text-white">Headquarter</h2>
                        <p className="font-light text-sm font-orbit text-zinc-400 group-hover:text-white transition-colors leading-relaxed">
                            Bengaluru, Karnataka 560012
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
