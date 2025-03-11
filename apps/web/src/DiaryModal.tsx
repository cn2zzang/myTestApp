import { useState } from "react";
import { format } from "date-fns";
import Calendar from "react-calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import "@/styles/calendar.css";
import useCameraImage from "./hooks/useCameraImage";

const DiaryModal = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { imageUri, resetImageUri, handleRequestCamera } = useCameraImage();

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsOpen(true);
  };

  const handleSave = () => {
    console.log("📅 저장된 일기:", {
      date: selectedDate,
      title,
      content,
      imageUri,
    });
    setIsOpen(false);
    setTitle("");
    setContent("");
    resetImageUri();
  };

  const handleImage = () => {
    console.log("📷 이미지 첨부");
    handleRequestCamera();
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Calendar onClickDay={handleDateClick} className="w-full" />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedDate
                ? format(selectedDate, "yyyy년 MM월 dd일")
                : "다이어리 작성"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Input
              width="100%"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {imageUri && (
              <img
                src={imageUri}
                alt="today image"
                style={{ width: "100%", maxHeight: 300 }}
              />
            )}
            <Textarea
              className="w-full min-h-[200px]"
              placeholder="오늘의 일기"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button variant="outline" onClick={handleImage}>
              이미지 첨부
            </Button>
            <Button onClick={handleSave}>저장</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiaryModal;
