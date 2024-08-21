import React from 'react'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Divider, Typography } from '@mui/material';
import {Grid} from '@mui/material';
function TimeLine() {
  return (
    <div style={{ 
        display : 'flex',
        width : '100%',
        flexDirection : 'column',
        alignItem : 'center',
        justifyContent : 'center',
    }}>
       <Grid container> 
         <Typography variant='h2'> How we <span style={{fontWeight : 'bold' ,color : 'red'}}> work</span></Typography>
       </Grid>
        <Grid container> 
      <Timeline position="alternate"> 
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot  color="primary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{fontSize : '2rem' ,fontWeight : 'bold' }}>Select 
        <Typography>Choose product from our various collection</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot  color="primary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent  sx={{fontSize : '2rem' ,fontWeight : 'bold'}}>Share 
            <Typography>Share your photos to us and stay calm</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot  color="primary"/>
        </TimelineSeparator>
        <TimelineContent  sx={{fontSize : '2rem' ,fontWeight : 'bold'}}>Edit
            <Typography> Edit  photos with your ideas,we provide unlimted changes* </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
    </Grid>
    </div>
  )
}

export default TimeLine
