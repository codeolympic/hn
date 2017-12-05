import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor';

// https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md
const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-h'
                 changePositionKey='ctrl-q'
                 changeMonitorKey='ctrl-m'>
        <LogMonitor theme='tomorrow'/>
    </DockMonitor>
);

export default DevTools
