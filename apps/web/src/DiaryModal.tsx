import { useEffect, useState } from "react";
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
import {
  Diary,
  getDiaries,
  getDiaryByDate,
  saveDiary,
} from "@shared/diaryService";

const DiaryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { imageUri, setImageUri, resetImageUri, handleRequestCamera } =
    useCameraImage();

  const [diaries, setDiaries] = useState<Diary[]>([]);

  const getDiaryData = async () => {
    const data = await getDiaries();
    setDiaries(data);
  };

  useEffect(() => {
    getDiaryData();
  }, [selectedDate]);

  const handleDateClick = async (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const data = await getDiaryByDate(formattedDate);

    console.log("handleDateClick", { formattedDate, diaries, data });
    setSelectedDate(formattedDate);

    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setImageUri(data.imageUri);
    }

    setIsOpen(true);
  };

  const resetDiary = () => {
    setTitle("");
    setContent("");
    resetImageUri();
  };

  const handleSave = async () => {
    const formattedDate = format(selectedDate!, "yyyy-MM-dd");
    const data: Diary = {
      date: formattedDate,
      title,
      content,
      imageUri,
    };
    console.log("📅 저장된 일기:", data);
    await saveDiary(data);

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: "SAVE_DIARY", data })
    );

    await setIsOpen(false);
    await resetDiary();
  };

  const handleImage = () => {
    handleRequestCamera();
  };

  const handleOpen = (open: boolean) => {
    setIsOpen(open);
    resetDiary();
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Calendar
        onClickDay={handleDateClick}
        className="w-full"
        tileContent={({ date }) => {
          const formattedDate = format(date, "yyyy-MM-dd");
          console.log("date", { date, formattedDate });

          const diary = diaries.find((data) => data.date === formattedDate);
          return diary ? (
            <span className="flex flex-col items-center text-xs text-gray-700">
              {diary.title}
              {diary.imageUri && (
                <div className="flex justify-center items-center mt-1">
                  <img
                    src={diary.imageUri}
                    alt="Diary Thumbnail"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                </div>
              )}
            </span>
          ) : null;
        }}
      />

      <Dialog open={isOpen} onOpenChange={handleOpen}>
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
              placeholder="오늘의 기록"
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
