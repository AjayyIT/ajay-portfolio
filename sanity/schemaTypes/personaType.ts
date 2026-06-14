import { defineField, defineType, defineArrayMember } from 'sanity'

export const personaType = defineType({
  name: 'persona',
  title: 'My Persona (AI Knowledge Base)',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      description: 'Your exact name (e.g., AJAY RS)',
    }),
    defineField({
      name: 'role',
      title: 'Current Role / Headline',
      type: 'string',
      description: 'e.g., Cloud Architect & Full-Stack Developer',
    }),
    defineField({
      name: 'characterAndBehavior',
      title: 'Character & Assistant Behavior',
      type: 'text',
      description: 'Instructions for the AI. How should it act? What is your personality like?',
    }),
    defineField({
      name: 'currentlyLearning',
      title: 'Currently Learning / Focused On',
      type: 'text',
      description: 'What are you working on right now? (e.g., RAG pipelines, Three.js)',
    }),
    defineField({
      name: 'skills',
      title: 'Technical Skills',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Add your skills one by one (e.g., AWS, Azure, Next.js, LangChain)',
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'degree', type: 'string', title: 'Degree/Course (e.g., Bachelor of Technology in Information Technology)' },
            { name: 'institution', type: 'string', title: 'Institution' },
            { name: 'status', type: 'string', title: 'Status / Year' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'projects',
      title: 'Key Projects & Experience',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Project Title (e.g., ServiceNow Database Management)' },
            { name: 'description', type: 'text', title: 'Description & Your Role' },
            { name: 'techStack', type: 'string', title: 'Tech Stack Used' },
          ],
        }),
      ],
    }),
  ],
})