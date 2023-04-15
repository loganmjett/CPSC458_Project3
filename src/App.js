import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import {
  DndContext,
  closestCenter,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import {useState} from 'react';
import styled from 'styled-components'; //not added yet
import { SortableItem } from './SortableItem';

function App() {
  const [steps, setSteps] = useState([
    "1) Ensure that you have installed dnd-kit and react-bootstrap dependencies.", 
    "2) Put all contents to be dragged into a <DndContext> container.", 
    "3) Determine how you want to detect collisions (this example uses closestCenter).",
    "4) Determine how to handle drag events (this example uses onDragEnd).",
    "5) Use dnd-kit's <SortableContext> to wrap the items you want to be sortable.",
    "6) Start dragging!"
  ]);
  
  return (
    <DndContext
      collisionDetection = {closestCenter}
      onDragEnd = {handleDragEnd}
    >
      <Container style={{"width": "50%"}} align="center">
        <h3>How to use Drag n Drop:</h3>
        <SortableContext 
        items={steps} 
        strategy={verticalListSortingStrategy}
        >
          {steps.map(step => <SortableItem key={step} id={step} />)}
        </SortableContext>
      </Container>
    </DndContext>
  );

  function handleDragEnd(event) {
    // console.log("Drag ended");
    const {active, over} = event;
    // console.log("Active: " + active.id);
    // console.log("Over: " + over.id);

    if(active.id !== over.id) {
      setSteps((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        const newItems = arrayMove(items, activeIndex, overIndex);

        return newItems;
      });
    }
  }
}

export default App;

