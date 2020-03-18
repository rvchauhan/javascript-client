import * as yup from 'yup';

export const PUBLIC_IMAGE_FOLDER = '/images/';
export const DEFAULT_BANNER_IMAGE = '/Banner/default.png';
export const banners = ['cloud.jpg', 'dns-server.png', 'full-stack-web-development.jpg', 'js.jpg', 'load-balancer.png'];

export const selectOptions = [
  {
    label: 'Cricket',
    value: 'cricket',
  },
  {
    label: 'Football',
    value: 'football',
  },
];

export const radioOptionsCricket = [
  {
    label: 'Bowler',
    value: 'bowler',
  },
  {
    label: 'Batsman',
    value: 'batsman',
  },
  {
    label: 'Wicket Keeper',
    value: 'wicket Keeper',
  },
  {
    label: 'All rounder',
    value: 'all rounder',
  },
];


export const radioOptionsFootball = [
  {
    label: 'Defender',
    value: 'defender',
  },
  {
    label: 'Striker',
    value: 'striker',
  },
];

const schema = yup.object().shape({
  name: yup.string().required('Please Enter your Name').min(3, 'Please enter no less than 3 characters'),
  sport: yup.string().required('Please select a sport'),
  football: yup.string().when('sport', {
    is: 'football',
    then: yup.string().required('Select option'),
  }),
  cricket: yup.string().when('sport', {
    is: 'cricket',
    then: yup.string().required('Select option'),
  }),
});
export { schema };
