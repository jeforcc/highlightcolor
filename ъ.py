import customtkinter as ctk
from tkinter import colorchooser, filedialog, messagebox
from PIL import Image, ImageDraw, ImageTk
import os

ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("blue")

class PreviewCanvas(ctk.CTkLabel):
    def __init__(self, master, size=180):
        super().__init__(master, text="")
        self.size = size
        self.hilight = (0, 120, 215, 120)
        self.hottrack = (0, 120, 215, 255)
        self.update_preview()

    def update_colors(self, hilight, hottrack):
        self.hilight = hilight
        self.hottrack = hottrack
        self.update_preview()

    def update_preview(self):
        img = Image.new("RGBA", (self.size, self.size), (34, 34, 34, 255))
        draw = ImageDraw.Draw(img)
        # Заливка
        draw.rectangle([20, 20, self.size-20, self.size-20], fill=self.hilight)
        # Рамка
        draw.rectangle([20, 20, self.size-20, self.size-20], outline=self.hottrack, width=3)
        self.imgtk = ImageTk.PhotoImage(img)
        self.configure(image=self.imgtk)

class App(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title("Цвет выделения Windows .reg")
        self.geometry("350x420")
        self.resizable(True, True)

        self.hilight = (0, 120, 215, 120)
        self.hottrack = (0, 120, 215, 255)
        self.reg_file_path = None

        ctk.CTkLabel(self, text="Предпросмотр выделения", font=("Arial", 16)).pack(pady=(15, 5))
        self.preview = PreviewCanvas(self)
        self.preview.pack(pady=5)

        self.hilight_btn = ctk.CTkButton(self, text="Выбрать цвет заливки", command=self.choose_hilight)
        self.hilight_btn.pack(pady=(20, 5))
        self.hilight_label = ctk.CTkLabel(self, text="Заливка: 0 120 215", font=("Arial", 12))
        self.hilight_label.pack()

        self.hottrack_btn = ctk.CTkButton(self, text="Выбрать цвет рамки", command=self.choose_hottrack)
        self.hottrack_btn.pack(pady=(20, 5))
        self.hottrack_label = ctk.CTkLabel(self, text="Рамка: 0 120 215", font=("Arial", 12))
        self.hottrack_label.pack()

        self.save_btn = ctk.CTkButton(self, text="Создать .reg файл", command=self.save_reg, state="normal")
        self.save_btn.pack(pady=(30, 10))

    def choose_hilight(self):
        color = colorchooser.askcolor(title="Выбери цвет заливки")[0]
        if color:
            self.hilight = (int(color[0]), int(color[1]), int(color[2]), 120)
            self.hilight_label.configure(text=f"Заливка: {self.hilight[0]} {self.hilight[1]} {self.hilight[2]}")
            self.preview.update_colors(self.hilight, self.hottrack)

    def choose_hottrack(self):
        color = colorchooser.askcolor(title="Выбери цвет рамки")[0]
        if color:
            self.hottrack = (int(color[0]), int(color[1]), int(color[2]), 255)
            self.hottrack_label.configure(text=f"Рамка: {self.hottrack[0]} {self.hottrack[1]} {self.hottrack[2]}")
            self.preview.update_colors(self.hilight, self.hottrack)

    def save_reg(self):
        hilight_rgb = f"{self.hilight[0]} {self.hilight[1]} {self.hilight[2]}"
        hottrack_rgb = f"{self.hottrack[0]} {self.hottrack[1]} {self.hottrack[2]}"
        reg_content = f"""Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\Control Panel\\Colors]
\"Hilight\"=\"{hilight_rgb}\"
\"HotTrackingColor\"=\"{hottrack_rgb}\"
"""
        path = filedialog.asksaveasfilename(defaultextension=".reg", filetypes=[("Registry Files", "*.reg")])
        if path:
            with open(path, "w", encoding="utf-8") as f:
                f.write(reg_content)
            self.reg_file_path = path
            self.save_btn.configure(text="Запустить .reg", command=self.run_reg)

    def run_reg(self):
        if self.reg_file_path and os.path.exists(self.reg_file_path):
            try:
                os.startfile(self.reg_file_path)
            except Exception as e:
                messagebox.showerror("Ошибка", f"Не удалось запустить файл: {e}")
                return
            answer = messagebox.askyesno("Перезагрузка", "Изменения вступят в силу после перезагрузки. Перезагрузить компьютер сейчас?")
            if answer:
                try:
                    os.system("shutdown /r /t 0")
                except Exception as e:
                    messagebox.showerror("Ошибка", f"Не удалось перезагрузить: {e}")

if __name__ == "__main__":
    app = App()
    app.mainloop()