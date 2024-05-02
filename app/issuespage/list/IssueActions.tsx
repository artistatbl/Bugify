import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import IssueStatusFilter from './IssueStatusFilter';
import CreateIssue from '@/app/issuespage/_component/CreateIssue';

const IssueActions = () => {
  return (
    <Flex justify="between">
      <IssueStatusFilter />
      {/* <Button> */}
        <CreateIssue />
      {/* </Button> */}
    </Flex>
  );
};

export default IssueActions;