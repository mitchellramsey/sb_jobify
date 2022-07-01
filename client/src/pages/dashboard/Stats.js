import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showStats } from '../../features/stats/statsSlice';
import { StatsContainer, Loading, ChartsContainer } from '../../components';

const Stats = () => {
  const dispatch = useDispatch();
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.stats
  );
  useEffect(() => {
    dispatch(showStats());
  }, [dispatch]);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <div>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </div>
  );
};

export default Stats;
