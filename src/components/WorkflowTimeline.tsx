import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css'; // Import the default styles

const WorkflowTimeline: React.FC = () => {
  return (
    <VerticalTimeline>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="January 1, 2025"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        icon={<i className="fas fa-briefcase"></i>} // You can use any icon
      >
        <h3 className="vertical-timeline-element-title">Request Created</h3>
        <p>Details of the request creation</p>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="January 5, 2025"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        icon={<i className="fas fa-check-circle"></i>}
      >
        <h3 className="vertical-timeline-element-title">Manager Approval</h3>
        <p>Details of the manager approval process</p>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="January 10, 2025"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        icon={<i className="fas fa-dollar-sign"></i>}
      >
        <h3 className="vertical-timeline-element-title">Finance Review</h3>
        <p>Details of the finance review</p>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="January 15, 2025"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        icon={<i className="fas fa-thumbs-up"></i>}
      >
        <h3 className="vertical-timeline-element-title">Final Approval</h3>
        <p>Details of the final approval</p>
      </VerticalTimelineElement>
    </VerticalTimeline>
  );
};

export default WorkflowTimeline;
