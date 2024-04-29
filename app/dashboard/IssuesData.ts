import prisma from '../../prisma/client'
import { Status, Priority } from '@prisma/client'


export const getIssueCount = async () =>  await prisma.issue.count();
