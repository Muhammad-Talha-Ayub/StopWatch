import React, { useState } from "react";
import "./StopWatch.css";
import Timer from "../Timer/Timer";
import ControlButtons from "../ControlButtons/ControlButtons";
import { Modal } from "antd";

function StopWatch() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  React.useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(true);
    setTime(0);
  };

  const showResetModal = () => {
    setIsActive(false);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      handleReset();
      setIsModalOpen(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="stop-watch">
      <Timer time={time} />
      <ControlButtons
        active={isActive}
        isPaused={isPaused}
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleReset={showResetModal}
      />
      <Modal
        title="Reset Timer"
        open={isModalOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Do you want to reset the timer?</p>
      </Modal>
    </div>
  );
}

export default StopWatch;
