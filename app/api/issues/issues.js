// pages/api/issues.js

import prisma from 'prisma/client';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const issues = await prisma.issue.findMany();
      res.status(200).json(issues);
    } catch (error) {
      console.error('Error fetching issues:', error);
      res.status(500).json({ error: 'Error fetching issues' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
