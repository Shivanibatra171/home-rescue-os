// // // import { useState } from 'react';
// // // import { useForm } from 'react-hook-form';
// // // import { motion } from 'framer-motion';
// // // import { Mail, Phone, MapPin, Send } from 'lucide-react';
// // // import toast from 'react-hot-toast';
// // // import { Input } from '@/components/ui/Input';
// // // import { Textarea } from '@/components/ui/Textarea';
// // // import { Button } from '@/components/ui/Button';

// // // interface ContactForm {
// // //   name: string;
// // //   email: string;
// // //   subject: string;
// // //   message: string;
// // // }

// // // const contactInfo = [
// // //   { icon: Phone, label: 'Phone', value: '+92 312 3269180' },
// // //   { icon: Mail, label: 'Email', value: 'shivanibatra978@gmail.com' },
// // //   { icon: MapPin, label: 'Office', value: 'Gulshan-e-Iqbal, Karachi, Pakistan' },
// // // ];

// // // export default function Contact() {
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const {
// // //     register,
// // //     handleSubmit,
// // //     reset,
// // //     formState: { errors },
// // //   } = useForm<ContactForm>();

// // //   const onSubmit = (_data: ContactForm) => {
// // //     setIsLoading(true);
// // //     setTimeout(() => {
// // //       toast.success('Message sent! We will get back to you soon.');
// // //       setIsLoading(false);
// // //       reset();
// // //     }, 900);
// // //   };

// // //   return (
// // //     <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
// // //       <div className="flex flex-col items-center text-center">
// // //         <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
// // //           Contact Us
// // //         </span>
// // //         <h1 className="mt-2 font-display text-3xl font-bold text-surface-900 dark:text-surface-50 sm:text-4xl">
// // //           We'd love to hear from you
// // //         </h1>
// // //         <p className="mt-3 max-w-xl text-surface-500 dark:text-surface-400">
// // //           Questions, feedback, or partnership ideas — send us a message and our team will respond shortly.
// // //         </p>
// // //       </div>

// // //       <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-5">
// // //         <motion.div
// // //           initial={{ opacity: 0, x: -16 }}
// // //           whileInView={{ opacity: 1, x: 0 }}
// // //           viewport={{ once: true }}
// // //           transition={{ duration: 0.5 }}
// // //           className="lg:col-span-2 space-y-4"
// // //         >
// // //           {contactInfo.map((info) => (
// // //             <div key={info.label} className="flex items-center gap-4 rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-5">
// // //               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
// // //                 <info.icon size={20} />
// // //               </div>
// // //               <div>
// // //                 <p className="text-xs text-surface-400">{info.label}</p>
// // //                 <p className="text-sm font-semibold text-surface-900 dark:text-surface-50">{info.value}</p>
// // //               </div>
// // //             </div>
// // //           ))}
// // //           <div className="overflow-hidden rounded-2xl border border-surface-100 dark:border-surface-800 h-48 bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-surface-400 text-sm">
// // //             Map placeholder
// // //           </div>
// // //         </motion.div>

// // //         <motion.form
// // //           initial={{ opacity: 0, x: 16 }}
// // //           whileInView={{ opacity: 1, x: 0 }}
// // //           viewport={{ once: true }}
// // //           transition={{ duration: 0.5, delay: 0.1 }}
// // //           onSubmit={handleSubmit(onSubmit)}
// // //           className="lg:col-span-3 space-y-4 rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 sm:p-8"
// // //         >
// // //           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
// // //             <Input
// // //               label="Your name"
// // //               placeholder="Ali Hamza"
// // //               error={errors.name?.message}
// // //               {...register('name', { required: 'Name is required' })}
// // //             />
// // //             <Input
// // //               label="Email address"
// // //               type="email"
// // //               placeholder="you@example.com"
// // //               error={errors.email?.message}
// // //               {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })}
// // //             />
// // //           </div>
// // //           <Input
// // //             label="Subject"
// // //             placeholder="How can we help?"
// // //             error={errors.subject?.message}
// // //             {...register('subject', { required: 'Subject is required' })}
// // //           />
// // //           <Textarea
// // //             label="Message"
// // //             placeholder="Tell us more..."
// // //             rows={5}
// // //             error={errors.message?.message}
// // //             {...register('message', { required: 'Message is required' })}
// // //           />
// // //           <Button type="submit" size="lg" isLoading={isLoading} rightIcon={<Send size={16} />}>
// // //             Send Message
// // //           </Button>
// // //         </motion.form>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// //   import { useState } from 'react';
// // import { useForm } from 'react-hook-form';
// // import { motion } from 'framer-motion';
// // import { Mail, Phone, MapPin, Send } from 'lucide-react';
// // import toast from 'react-hot-toast';
// // import { Input } from '@/components/ui/Input';
// // import { Textarea } from '@/components/ui/Textarea';
// // import { Button } from '@/components/ui/Button';

// // interface ContactForm {
// //   name: string;
// //   email: string;
// //   subject: string;
// //   message: string;
// // }

// // const contactInfo = [
// //   { icon: Phone, label: 'Phone', value: '+92 312 3269180', href: 'tel:+923123269180' },
// //   { icon: Mail, label: 'Email', value: 'shivanibatra978@gmail.com', href: 'mailto:shivanibatra978@gmail.com' },
// //   { icon: MapPin, label: 'Office', value: 'Karachi, Pakistan', href: undefined },
// // ];

// // export default function Contact() {
// //   const [isLoading, setIsLoading] = useState(false);
// //   const {
// //     register,
// //     handleSubmit,
// //     reset,
// //     formState: { errors },
// //   } = useForm<ContactForm>();

// //   const onSubmit = (_data: ContactForm) => {
// //     setIsLoading(true);
// //     setTimeout(() => {
// //       toast.success('Message sent! We will get back to you soon.');
// //       setIsLoading(false);
// //       reset();
// //     }, 900);
// //   };

// //   return (
// //     <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
// //       <div className="flex flex-col items-center text-center">
// //         <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
// //           Contact Us
// //         </span>
// //         <h1 className="mt-2 font-display text-3xl font-bold text-surface-900 dark:text-surface-50 sm:text-4xl">
// //           We'd love to hear from you
// //         </h1>
// //         <p className="mt-3 max-w-xl text-surface-500 dark:text-surface-400">
// //           Questions, feedback, or partnership ideas — send us a message and our team will respond shortly.
// //         </p>
// //       </div>

// //       <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-5">
// //         <motion.div
// //           initial={{ opacity: 0, x: -16 }}
// //           whileInView={{ opacity: 1, x: 0 }}
// //           viewport={{ once: true }}
// //           transition={{ duration: 0.5 }}
// //           className="lg:col-span-2 space-y-4"
// //         >
// //           {contactInfo.map((info) => {
// //             const content = (
// //               <div className="flex items-center gap-4 rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-5">
// //                 <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
// //                   <info.icon size={20} />
// //                 </div>
// //                 <div>
// //                   <p className="text-xs text-surface-400">{info.label}</p>
// //                   <p className="text-sm font-semibold text-surface-900 dark:text-surface-50">{info.value}</p>
// //                 </div>
// //               </div>
// //             );
// //             return info.href ? (
// //               <a key={info.label} href={info.href} className="block hover:opacity-90">
// //                 {content}
// //               </a>
// //             ) : (
// //               <div key={info.label}>{content}</div>
// //             );
// //           })}
// //           <div className="overflow-hidden rounded-2xl border border-surface-100 dark:border-surface-800 h-48 bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-surface-400 text-sm">
// //             Map placeholder
// //           </div>
// //         </motion.div>

// //         <motion.form
// //           initial={{ opacity: 0, x: 16 }}
// //           whileInView={{ opacity: 1, x: 0 }}
// //           viewport={{ once: true }}
// //           transition={{ duration: 0.5, delay: 0.1 }}
// //           onSubmit={handleSubmit(onSubmit)}
// //           className="lg:col-span-3 space-y-4 rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 sm:p-8"
// //         >
// //           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
// //             <Input
// //               label="Your name"
// //               placeholder="Ali Hamza"
// //               error={errors.name?.message}
// //               {...register('name', { required: 'Name is required' })}
// //             />
// //             <Input
// //               label="Email address"
// //               type="email"
// //               placeholder="you@example.com"
// //               error={errors.email?.message}
// //               {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })}
// //             />
// //           </div>
// //           <Input
// //             label="Subject"
// //             placeholder="How can we help?"
// //             error={errors.subject?.message}
// //             {...register('subject', { required: 'Subject is required' })}
// //           />
// //           <Textarea
// //             label="Message"
// //             placeholder="Tell us more..."
// //             rows={5}
// //             error={errors.message?.message}
// //             {...register('message', { required: 'Message is required' })}
// //           />
// //           <Button type="submit" size="lg" isLoading={isLoading} rightIcon={<Send size={16} />}>
// //             Send Message
// //           </Button>
// //         </motion.form>
// //       </div>
// //     </div>
// //   );
// // }


// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { motion } from 'framer-motion';
// import { Mail, Phone, MapPin, Send } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { Input } from '@/components/ui/Input';
// import { Textarea } from '@/components/ui/Textarea';
// import { Button } from '@/components/ui/Button';

// interface ContactForm {
//   name: string;
//   email: string;
//   subject: string;
//   message: string;
// }

// const contactInfo = [
//   { icon: Phone, label: 'Phone', value: '+92 312 3269180', href: 'tel:+923123269180' },
//   { icon: Mail, label: 'Email', value: 'shivanibatra978@gmail.com', href: 'mailto:shivanibatra978@gmail.com' },
//   { icon: MapPin, label: 'Office', value: 'Near IBA Sukkur University, Sukkur, Sindh', href: undefined },
// ];

// const MAP_EMBED_URL =
//   'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.3860927620653!2d67.09138555!3d24.91891385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f3306eed5eb%3A0xbae4ecff6bd01ffe!2sBlock%205%20Gulshan-e-Iqbal%2C%20Karachi%2C%2075300%2C%20Pakistan!5e0!3m2!1sen!2snl!4v1784700388943!5m2!1sen!2snl';

// export default function Contact() {
//   const [isLoading, setIsLoading] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<ContactForm>();

//   const onSubmit = (_data: ContactForm) => {
//     setIsLoading(true);
//     setTimeout(() => {
//       toast.success('Message sent! We will get back to you soon.');
//       setIsLoading(false);
//       reset();
//     }, 900);
//   };

//   return (
//     <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//       <div className="flex flex-col items-center text-center">
//         <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
//           Contact Us
//         </span>
//         <h1 className="mt-2 font-display text-3xl font-bold text-surface-900 dark:text-surface-50 sm:text-4xl">
//           We'd love to hear from you
//         </h1>
//         <p className="mt-3 max-w-xl text-surface-500 dark:text-surface-400">
//           Questions, feedback, or partnership ideas — send us a message and our team will respond shortly.
//         </p>
//       </div>

//       <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-5">
//         <motion.div
//           initial={{ opacity: 0, x: -16 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="lg:col-span-2 space-y-4"
//         >
//           {contactInfo.map((info) => {
//             const content = (
//               <div className="flex items-center gap-4 rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-5">
//                 <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
//                   <info.icon size={20} />
//                 </div>
//                 <div>
//                   <p className="text-xs text-surface-400">{info.label}</p>
//                   <p className="text-sm font-semibold text-surface-900 dark:text-surface-50">{info.value}</p>
//                 </div>
//               </div>
//             );
//             return info.href ? (
//               <a key={info.label} href={info.href} className="block hover:opacity-90">
//                 {content}
//               </a>
//             ) : (
//               <div key={info.label}>{content}</div>
//             );
//           })}

//           <div className="overflow-hidden rounded-2xl border border-surface-100 dark:border-surface-800 h-64">
//             <iframe
//               title="Office location map"
//               src={MAP_EMBED_URL}
//               width="100%"
//               height="100%"
//               style={{ border: 0 }}
//               loading="lazy"
//               referrerPolicy="strict-origin-when-cross-origin"
//               allowFullScreen
//             />
//           </div>
//         </motion.div>

//         <motion.form
//           initial={{ opacity: 0, x: 16 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           onSubmit={handleSubmit(onSubmit)}
//           className="lg:col-span-3 space-y-4 rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 sm:p-8"
//         >
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//             <Input
//               label="Your name"
//               placeholder="Ali Hamza"
//               error={errors.name?.message}
//               {...register('name', { required: 'Name is required' })}
//             />
//             <Input
//               label="Email address"
//               type="email"
//               placeholder="you@example.com"
//               error={errors.email?.message}
//               {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })}
//             />
//           </div>
//           <Input
//             label="Subject"
//             placeholder="How can we help?"
//             error={errors.subject?.message}
//             {...register('subject', { required: 'Subject is required' })}
//           />
//           <Textarea
//             label="Message"
//             placeholder="Tell us more..."
//             rows={5}
//             error={errors.message?.message}
//             {...register('message', { required: 'Message is required' })}
//           />
//           <Button type="submit" size="lg" isLoading={isLoading} rightIcon={<Send size={16} />}>
//             Send Message
//           </Button>
//         </motion.form>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+92 312 3269180',
    href: 'tel:+923123269180',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'shivanibatra978@gmail.com',
    href: 'mailto:shivanibatra978@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Near IBA Sukkur University, Sukkur, Sindh',
    href: undefined,
  },
];

const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.3860927620653!2d67.09138555!3d24.91891385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f3306eed5eb%3A0xbae4ecff6bd01ffe!2sBlock%205%20Gulshan-e-Iqbal%2C%20Karachi%2C%2075300%2C%20Pakistan!5e0!3m2!1sen!2snl!4v1784700388943!5m2!1sen!2snl';

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>();

  const onSubmit = (_data: ContactForm) => {
    setIsLoading(true);

    setTimeout(() => {
      toast.success('Message sent! We will get back to you soon.');
      setIsLoading(false);
      reset();
    }, 900);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          Contact Us
        </span>

        <h1 className="mt-2 font-display text-3xl font-bold text-surface-900 dark:text-surface-50 sm:text-4xl">
          We'd love to hear from you
        </h1>

        <p className="mt-3 max-w-xl text-surface-500 dark:text-surface-400">
          Questions, feedback, or partnership ideas — send us a message and
          our team will respond shortly.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4 lg:col-span-2"
        >
          {contactInfo.map((info) => {
            const content = (
              <div className="flex items-center gap-4 rounded-2xl border border-surface-100 bg-white p-5 dark:border-surface-800 dark:bg-surface-900">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                  <info.icon size={20} />
                </div>

                <div>
                  <p className="text-xs text-surface-400">
                    {info.label}
                  </p>

                  <p className="text-sm font-semibold text-surface-900 dark:text-surface-50">
                    {info.value}
                  </p>
                </div>
              </div>
            );

            return info.href ? (
              <a
                key={info.label}
                href={info.href}
                className="block hover:opacity-90"
              >
                {content}
              </a>
            ) : (
              <div key={info.label}>{content}</div>
            );
          })}

          {/* Google Map */}
          <div className="h-64 overflow-hidden rounded-2xl border border-surface-100 dark:border-surface-800">
            <iframe
              title="Office location map"
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-2xl border border-surface-100 bg-white p-6 dark:border-surface-800 dark:bg-surface-900 sm:p-8 lg:col-span-3"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Your name"
              placeholder="Ali Hamza"
              error={errors.name?.message}
              {...register('name', {
                required: 'Name is required',
              })}
            />

            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Enter a valid email',
                },
              })}
            />
          </div>

          <Input
            label="Subject"
            placeholder="How can we help?"
            error={errors.subject?.message}
            {...register('subject', {
              required: 'Subject is required',
            })}
          />

          <Textarea
            label="Message"
            placeholder="Tell us more..."
            rows={5}
            error={errors.message?.message}
            {...register('message', {
              required: 'Message is required',
            })}
          />

          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            rightIcon={<Send size={16} />}
          >
            Send Message
          </Button>
        </motion.form>
      </div>
    </div>
  );
}