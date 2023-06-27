import { Error, Loading } from '@/components/shared';
import { TeamTab } from '@/components/team';
import useTeam from 'hooks/useTeam';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button } from 'react-daisyui';
import type { NextPageWithLayout } from 'types';

import APIKeys from './APIKeys';
import NewAPIKey from './NewAPIKey';

const APIKeysContainer: NextPageWithLayout = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const { slug } = router.query as { slug: string };

  const { isLoading, isError, team } = useTeam(slug);

  if (isLoading || !team) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <TeamTab activeTab="api-keys" team={team} />
      <div className="flex flex-col space-y-4">
        <div className="flex justify-end mt-4">
          <Button
            color="primary"
            variant="outline"
            onClick={() => setCreateModalVisible(true)}
          >
            New API Key
          </Button>
        </div>
        <APIKeys team={team} />
      </div>
      <NewAPIKey
        team={team}
        createModalVisible={createModalVisible}
        setCreateModalVisible={setCreateModalVisible}
      />
    </>
  );
};

export default APIKeysContainer;