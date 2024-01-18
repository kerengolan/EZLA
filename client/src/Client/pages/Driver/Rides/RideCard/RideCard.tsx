import { useCallback, useEffect, useState } from 'react';
import { Button, Card, CardContent, Divider, Typography } from '@mui/material';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import CarIcon from '@mui/icons-material/DirectionsCarFilled';
import PhoneIcon from '@mui/icons-material/LocalPhoneRounded';
import BellIcon from '@mui/icons-material/NotificationImportantRounded';
import { Ride } from '../../../../../api-client';
import { SpecialRequestsChips } from '../../../../components/SpecicalRequests/SpecialRequests';

export const RideCard = ({
  ride,
  onSelect,
  selected,
  onApprovePassenger
}: {
  ride: Ride;
  onSelect: (ride: Ride) => void;
  selected: boolean;
  onApprovePassenger: () => void;
}) => {
  const [rideWaitingTime, setRideWaitingTime] = useState('');

  const onClickCallback = useCallback(() => {
    onSelect(ride);
  }, [onSelect, ride]);

  useEffect(() => {
    const rideTime = ride?.requestTimeStamp?.getTime() || 0;
    setRideWaitingTime(new Date(new Date().getTime() - rideTime).toISOString().substring(11, 16));

    const timeInterval = setInterval(() => {
      setRideWaitingTime(new Date(new Date().getTime() - rideTime).toISOString().substring(11, 16));
    }, 60000);

    return () => clearInterval(timeInterval);
  }, [ride]);

  const isWaitingTimeTooLong = rideWaitingTime.slice(0, 2) !== '00';

  return (
    <Card className="shadow-sm rounded-xl">
      <CardContent onClick={onClickCallback} className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-2">
              <Typography color="GrayText" variant="body2" component="div">
                המתנה לאיסוף:
              </Typography>
              <div className="flex items-center gap-1">
                <h1
                  className={`m-0 ${isWaitingTimeTooLong ? 'text-red-500' : 'text-black'} text-lg`}
                >
                  {rideWaitingTime}
                </h1>
                {isWaitingTimeTooLong && <BellIcon fontSize="small" className="fill-red-500" />}
              </div>
            </div>
            <div className="flex bg-green-500 rounded-full text-white items-center px-2 py-1">
              <p className="px-1 font-medium">{ride.passengerCount}</p>
              <EmojiPeopleRoundedIcon className="h-5" />
            </div>
          </div>
          <div className="flex items-center">
            <Typography color="GrayText" variant="body2" component="div">
              שם:
            </Typography>
            <Typography className="ml-1 mr-1" variant="body1" component="div">
              {ride?.firstName || ride?.rideRequester?.firstName}{' '}
              {ride?.lastName || ride?.rideRequester?.lastName}
            </Typography>
          </div>
          <div className="flex">
            <div className="flex-row flex-1">
              <Typography color="GrayText" variant="body2" component="div">
                איסוף
                <div className="flex gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M20.54 6.63c.69.94 1.15 2.04 1.35 3.19c.21 1.25.11 2.52-.31 3.72a7.349 7.349 0 0 1-2 3.06a9.1 9.1 0 0 1-2.26 1.58c.41 1.07-.13 2.27-1.2 2.68c-.24.09-.49.14-.74.14a2.08 2.08 0 0 1-2.07-2h-3.07c-.11 1.14-1.13 2-2.27 1.87c-1.06-.1-1.86-.98-1.88-2.04c.01-.19.04-.39.1-.57a8.37 8.37 0 0 1-4-2.85c-.33-.44-.23-1.07.23-1.41c.18-.14.4-.22.63-.22c.72 0 1-.25 1.17-.63c.24-.72.38-1.47.39-2.23c.03-.53.09-1.05.17-1.57A7.307 7.307 0 0 1 7.5 5c1.66-1.3 3.69-2 5.79-2c1.43 0 2.84.35 4.11 1a8.67 8.67 0 0 1 3.14 2.63m-3.82 10.68c1.78-.81 3.18-2.27 3.87-4.1c1.62-4.94-2.59-9.16-7.3-9.16c-.35 0-.71.02-1.06.07C9.36 4.5 6.4 6.5 5.81 9.5c-.38 2 .19 5.29-2.76 5.29C4 16 5.32 16.93 6.81 17.37c.85-.76 2.16-.68 2.93.18c.11.12.2.25.26.39h3.55c.52-1.02 1.78-1.44 2.8-.9c.15.08.25.17.37.27m-5.75-7c-.58.03-1.09-.41-1.12-1c-.03-.58.42-1.08 1-1.12c.58-.03 1.09.42 1.12 1.06a.999.999 0 0 1-.97 1.04l-.03.02m4.69 0c-.58.03-1.09-.41-1.12-1c-.04-.58.42-1.08 1-1.12c.58-.03 1.09.42 1.12 1.06c.02.55-.41 1.02-1 1.04v.02m-5.95 1.76c-.06-.28.13-.57.41-.62c.28-.05.56.13.62.41a2.501 2.501 0 0 0 2.58 1.74c1.14.06 2.18-.64 2.57-1.72c.14-.26.46-.38.71-.23c.18.1.29.27.29.47c-.19.71-.63 1.33-1.23 1.76c-.69.48-1.5.75-2.34.76h-.11c-1.63.07-3.1-1-3.53-2.58l.03.01Z"
                    />
                  </svg>

                  <Typography variant="body1" component="div" className="mb-2">
                    <a
                      href={`https://waze.com/ul?q=${ride?.origin}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {ride?.origin}
                    </a>
                  </Typography>
                </div>
              </Typography>
            </div>
            <div className="flex-row flex-1">
              <Typography color="GrayText" variant="body2" component="div">
                יעד
              </Typography>
              <Typography variant="body1" component="div">
                {ride.destination}
              </Typography>
            </div>
          </div>
          <div className="flex items-center">
            <Typography color="GrayText" variant="body2" component="div">
              הערה:
            </Typography>
            <Typography className="ml-1 mr-1" variant="body1" component="div">
              {ride?.comment}
            </Typography>
          </div>
          <SpecialRequestsChips specialRequests={ride.specialRequest || []} />
          {(selected || true) && (
            <>
              <Divider className="my-1" />
              <div className="flex gap-4">
                <Button
                  className="flex-1"
                  variant="outlined"
                  size="large"
                  startIcon={<PhoneIcon />}
                  onClick={() => window.open(`tel:${ride?.cellphone}`)}
                >
                  {ride?.cellphone}
                </Button>
                <Button
                  className="flex-1"
                  size="large"
                  variant="contained"
                  startIcon={<CarIcon />}
                  onClick={onApprovePassenger}
                  color="secondary"
                >
                  צאו לדרך
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
