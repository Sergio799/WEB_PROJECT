const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoryEnum=["Workshops", "Editing Softwares", "Fine Art", "Fashion", "Street", "Macro", "Astro", "Stage Events"]

const eventSchema = new Schema({
    category: {type: String, required: [true, 'Category is Required']}, 
    title: { type: String, required: [true, 'Title is Required'] },
    host: {type: Schema.Types.ObjectId, ref: 'User'},
    start_date_time: { type: Date, required: [true, 'Start date-time is Required'] },
    end_date_time: { type: Date, required: [true, 'End date-time is Required'] },
    location: { type: String, required: [true, 'Location is Required'] },
    details: { type: String, required: [true, 'Details are required'],
        minlength: [10, 'Details should be minimum of 10 characters'] },
    img: { type: Buffer, required: [true, 'Image is Required'] }
},
{ timestamps: true });

// module.exports = mongoose.model('Event', eventSchema);
module.exports = {"model": mongoose.model('Events', eventSchema), categoryEnum};








// const { DateTime } = require('luxon');
// const {v4: uuidv4} = require("uuid");

// let events = [
//     {
//         id: "1",
//         category: "Workshops",
//         title: "Portrait Photography",
//         hostname: "VUPPALA NALLAPAREDDY",
//         start_date_time: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
//         end_date_time: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
//         location: "UNCC Union",
//         details: "Portrait photography is a captivating art form that aims to capture the essence and personality of individuals or groups. It goes beyond mere representation, delving into emotions, expressions, and stories within a single frame. Successful portraits require a connection between the photographer and subject, with attention to detail, lighting, and composition. Advancements in technology have broadened the possibilities, from classic black and white to vibrant contemporary styles. Portraits freeze moments in time, evoking nostalgia or capturing cultural significance. They document history, providing insight into diverse lives and preserving stories for future generations. Ultimately, portrait photography celebrates the beauty and complexity of human experience, offering a profound connection between the viewer and the subject.",
//         img: "/images/portrait.jpg"
//     },
//     {
//         id: "2",
//         category: "Workshops",
//         title: "Candid Photography",
//         hostname: "VUPPALA NALLAPAREDDY",
//         start_date_time: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
//         end_date_time: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
//         location: "UNCC Union",
//         details: "Candid photography is an authentic and spontaneous approach to capturing moments as they naturally unfold. Unlike posed portraits, candid photography aims to capture genuine emotions, expressions, and interactions without the subjects being aware of the camera. This style often results in more candid and intimate images that reflect the true essence of the moment. Candid photographers rely on observation, anticipation, and quick reflexes to capture fleeting moments of emotion, laughter, or connection. The beauty of candid photography lies in its ability to convey raw and unfiltered emotions, making viewers feel as if they are witnessing the scene firsthand. Whether it's documenting everyday moments or capturing special occasions, candid photography provides a refreshing perspective that celebrates the authenticity and beauty of life's fleeting moments.",
//         img: "/images/candid.jpg"
//     },
//     {
//         id: "3",
//         category: "Workshops",
//         title: "Wedding Photography",
//         hostname: "VUPPALA NALLAPAREDDY",
//         start_date_time: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
//         end_date_time: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
//         location: "UNCC Union",
//         details: "Wedding photography is a cherished art form that immortalizes one of life's most significant milestones. It goes beyond mere documentation; it tells the story of love, joy, and celebration. Wedding photographers strive to capture every precious moment, from the nervous anticipation before the ceremony to the heartfelt vows exchanged between partners and the exuberant celebrations that follow. They blend creativity, technical skill, and a keen eye for detail to capture the essence of the day. From traditional posed portraits to candid shots brimming with emotion, wedding photography encompasses a diverse range of styles. These images serve as timeless reminders of the love shared between couples, the bonds of family and friends, and the magic of the day. Through wedding photography, moments of love and happiness are preserved for generations to come, allowing couples to relive their special day again and again ",
//         img: "/images/wedding.jpg"
//     },
//     {
//         id: "4",
//         category: "Workshops",
//         title: "Mobile Photography",
//         hostname: "VUPPALA NALLAPAREDDY",
//         start_date_time: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
//         end_date_time: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
//         location: "UNCC Union",
//         details: "Mobile photography has revolutionized the way we capture and share moments in our lives. With the widespread availability of smartphones equipped with high-quality cameras, anyone can become a photographer with just a tap of their screen. Mobile photography offers convenience, accessibility, and versatility, allowing users to capture images anytime, anywhere. From breathtaking landscapes to candid portraits, mobile photographers can explore various genres and styles effortlessly. Editing tools and filters available on mobile apps further enhance creativity, enabling users to transform ordinary photos into stunning works of art. Social media platforms serve as digital galleries where mobile photographers can share their creations with the world, fostering a vibrant community of visual storytellers. With the continuous advancements in technology, mobile photography continues to push the boundaries of creativity, democratizing the art form and empowering individuals to express themselves through the lens of their smartphones.",
//         img: "/images/mobile.jpg"
//     },

//     {
//         id: "5",
//         category: "Editing Softwares",
//         title: "Adobe Lightroom",
//         hostname: "VUPPALA NALLAPAREDDY",
//         start_date_time: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
//         end_date_time: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
//         location: "UNCC Union",
//         details: "Adobe Lightroom is a powerful and versatile software designed for photographers to organize, edit, and enhance their images with precision and efficiency. It offers a wide range of tools and features tailored to meet the needs of both amateur and professional photographers alike. With Lightroom, users can seamlessly manage their photo libraries, organizing images into catalogs and albums for easy access and retrieval. The editing capabilities of Lightroom are extensive, allowing users to adjust exposure, color, tone, and more with intuitive sliders and controls. Its non-destructive editing workflow ensures that original image files remain untouched, preserving the integrity of the source material. Furthermore, Lightroom's integration with Adobe Creative Cloud enables seamless collaboration and syncing across devices, allowing photographers to work on their images anytime, anywhere. Whether it's retouching portraits, creating stunning landscapes, or processing raw files, Adobe Lightroom empowers photographers to unleash their creativity and achieve their vision with ease.",
//         img: "/images/lightroom.png"
//     },

//     {
//         id: "6",
//         category: "Editing Softwares",
//         title: "Adobe Photoshop",
//         hostname: "VUPPALA NALLAPAREDDY",
//         start_date_time: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
//         end_date_time: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
//         location: "UNCC Union",
//         details: "Adobe Photoshop is the industry-standard software for digital image editing and manipulation. Renowned for its versatility and comprehensive feature set, Photoshop empowers users to unleash their creativity and transform ordinary images into extraordinary works of art. With a wide array of tools and capabilities, Photoshop offers unparalleled flexibility for retouching, compositing, and enhancing photographs. From removing imperfections and adjusting colors to creating intricate digital illustrations and 3D designs, the possibilities with Photoshop are virtually limitless. Its intuitive user interface and customizable workspace cater to the needs of both beginners and seasoned professionals, providing a seamless editing experience. Additionally, Photoshop's integration with Adobe Creative Cloud facilitates seamless collaboration and access to a vast library of resources, including brushes, fonts, and presets. As a cornerstone of digital imaging, Adobe Photoshop continues to inspire and empower creatives worldwide to push the boundaries of visual storytelling.",
//         img: "/images/photoshop.png"
//     },

//     {
//         id: "7",
//         category: "Editing Softwares",
//         title: "Davinci Resolve",
//         hostname: "VUPPALA NALLAPAREDDY",
//         start_date_time: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
//         end_date_time: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
//         location: "UNCC Union",
//         details: "DaVinci Resolve is a professional-grade video editing and color grading software renowned for its robust feature set and intuitive workflow. Developed by Blackmagic Design, it offers a comprehensive suite of tools for editing, color correction, visual effects, and audio post-production, all within a single application. With its advanced color grading capabilities, DaVinci Resolve is widely used in the film and television industry, allowing filmmakers to achieve cinematic looks and precise color adjustments with ease. Its non-linear editing interface provides flexibility and efficiency, enabling users to work on projects of any scale, from independent films to Hollywood blockbusters. Additionally, DaVinci Resolve's Fusion page integrates visual effects and motion graphics seamlessly into the editing workflow, while its Fairlight audio tools offer professional-grade audio editing and mixing capabilities. With its powerful features and user-friendly interface, DaVinci Resolve empowers filmmakers and video professionals to bring their creative visions to life.",
//         img: "/images/davinci.png"
//     },

//     {
//         id: "8",
//         category: "Editing Softwares",
//         title: "After Effects",
//         hostname: "VUPPALA NALLAPAREDDY",
//         start_date_time: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
//         end_date_time: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
//         location: "UNCC Union",
//         details: "Editing software encompasses a diverse range of applications tailored for various creative endeavors, from photo editing to video production and beyond. Adobe Creative Cloud offers a suite of industry-standard tools such as Adobe Photoshop for image manipulation, Adobe Premiere Pro for video editing, and Adobe After Effects for motion graphics and visual effects. These applications provide comprehensive features and seamless integration, enabling professionals to bring their creative visions to life. Other popular editing software includes Final Cut Pro for Mac users, renowned for its intuitive interface and powerful editing capabilities, and DaVinci Resolve, which excels in color grading and post-production. For those seeking free alternatives, software like GIMP and Shotcut offer robust features for photo and video editing, respectively. Whether for hobbyists or professionals, editing software empowers creators to express their creativity and produce compelling visual content across various mediums.",
//         img: "/images/aftereffects.png"
//     }
// ];

// let categories = ["Workshops", "Editing Softwares", "Fine Art", "Fashion", "Street", "Macro", "Astro", "Stage Events"]

// exports.find = () => events;
// exports.findById = (id) => events.find(event => event.id === id);

// exports.getUniqueCategories= () => {
//     return categories;
// };

// exports.create = (newEvent) => {
//     newEvent.id = uuidv4();
//     events.push(newEvent);
//     if(categories.indexOf(newEvent.category) === -1){
//         categories.push(newEvent.category);
//         categories.sort();
//     }
//     console.log(newEvent);
// };

// exports.save = function (story) {
//     story.id = uuidv4();
//     stories.push(story);
  
// };

// exports.updateById = (id, newEvent) => {
//     let event = this.findById(id);
//     if(event){
//         event.category = newEvent.category;
//         event.title = newEvent.title;
//         event.hostname = newEvent.hostname;
//         event.start_date_time = newEvent.start_date_time;
//         event.end_date_time = newEvent.end_date_time;
//         event.location = newEvent.location;
//         event.details = newEvent.details;
//         event.img = newEvent.img;
//         return true;
//     }
//     else{
//         return false;
//     }
// };

// exports.deleteById = (id) => {
//     let index = events.findIndex(event => event.id === id);
//     if(index != -1)
//     {
//         events.splice(index, 1);
//         return true;
//     }
//     else{
//         return false;
//     }
// }