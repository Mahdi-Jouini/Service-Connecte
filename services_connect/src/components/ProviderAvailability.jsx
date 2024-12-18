import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { Box, Button, IconButton } from '@mui/material';

const eventStyleGetter = (event) => {
  const style = {
    backgroundColor: event.color || '#3174ad',
    borderRadius: '5px',
    opacity: 0.8,
    color: 'white',
    border: '0px',
    display: 'block',
  };
  return { style };
};

const CustomToolbar = (toolbar) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box>
        <IconButton onClick={() => toolbar.onNavigate('PREV')}>
          <KeyboardArrowLeftRoundedIcon />
        </IconButton>
        <Button onClick={() => toolbar.onNavigate('TODAY')}>{toolbar.label}</Button>
        <IconButton onClick={() => toolbar.onNavigate('NEXT')}>
          <KeyboardArrowRightRoundedIcon />
        </IconButton>
      </Box>
      <Box sx={{ ml: 'auto', p: 2, display: 'flex', gap: 3 }}>
        <Button disableElevation size="small" variant="contained" onClick={() => toolbar.onView('day')}>
          Jour
        </Button>
        <Button disableElevation size="small" variant="contained" onClick={() => toolbar.onView('week')}>
          Semaine
        </Button>
      </Box>
    </Box>
  );
};

const localizer = momentLocalizer(moment);

const events = [
  {
    id: 1,
    title: '',
    start: new Date(2024, 11, 6, 8, 0, 0), // Corrected month (0-based index)
    end: new Date(2024, 11, 6, 19, 0, 0),
  },
  {
    id: 2,
    title: '',
    start: new Date(2024, 11, 7, 8, 0, 0),
    end: new Date(2024, 11, 7, 19, 0, 0),
  },
  {
    id: 3,
    title: '',
    start: new Date(2024, 7, 6, 0, 0, 0),
    end: new Date(2024, 7, 13, 0, 0, 0),
  },
  {
    id: 4,
    title: '',
    start: new Date(2024, 0, 9, 0, 0, 0),
    end: new Date(2024, 0, 9, 0, 0, 0),
  },
];

export default function ProviderAvailability({ onDateSelect }) {
  const handleSelectEvent = (event) => {
    const { start, end } = event;
    if (onDateSelect) onDateSelect({ start, end });
  };

  return (
    <Calendar
      defaultView={Views.WEEK}
      events={events}
      localizer={localizer}
      eventPropGetter={eventStyleGetter}
      selectable
      messages={{
        today: "Aujourd'hui",
        previous: 'Précédent',
        next: 'Suivant',
        week: 'Semaine',
        day: 'Jour',
        month: 'Mois',
      }}
      components={{
        toolbar: CustomToolbar,
      }}
      min={new Date(2024, 0, 1, 8, 0)}
      max={new Date(2024, 0, 1, 19, 0)}
      onSelectEvent={handleSelectEvent}
    />
  );
}
