import { useSelector } from 'react-redux';
import StatsItem from './StatsItem';
import {
  FaSuitcaseRolling,
  FaCalendarCheck,
  FaBug,
  FaThumbsUp,
} from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';

const StatsContainer = () => {
  const { stats } = useSelector((state) => state.stats);
  const defaultStats = [
    {
      title: 'applied',
      count: stats.applied || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'interviewing',
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'declined',
      count: stats.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#e0e8f9',
    },
    {
      title: 'accepted',
      count: stats.accepted || 0,
      icon: <FaThumbsUp />,
      color: '#38761d',
      bcg: '#d9ead3',
    },
  ];
  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatsItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
