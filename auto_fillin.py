import pyautogui
from pynput import mouse
import keyboard
import time

STOP_HOTKEY = 'f8'   # 中断程序的热键
START_HOTKEY = 'f9'  # 启动程序的热键
LOOP_DELAY = 0.05     # 每步之间的小延时，防止太快

running = True  # 控制总循环
start = False   # 是否开始运行

def do_one_cycle():
    """
    一次完整流程：
    1) 在当前（目标）窗口 Ctrl+V
    2) Alt+Tab 回到原窗口
    3) Ctrl+X
    4) Alt+Tab 回到目标窗口
    """
    # 3. Ctrl+X 剪切下一条数据
    pyautogui.hotkey('ctrl', 'x')
    time.sleep(LOOP_DELAY)
    
    # 4. Alt+Tab 回到目标窗口
    pyautogui.hotkey('alt', 'tab')
    time.sleep(LOOP_DELAY)
    
    # 1. 在目标窗口粘贴
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(LOOP_DELAY)
    
    # tab 键移动到下一个输入框
    pyautogui.hotkey('tab')
    time.sleep(LOOP_DELAY)

    # 2. Alt+Tab 回原窗口
    pyautogui.hotkey('alt', 'tab')
    time.sleep(LOOP_DELAY)




def on_click():
    if not start:
        return True  # 未启动时不响应鼠标点击
    """
    鼠标事件回调：当检测到你按下鼠标左键时，执行一次流程。
    """
    global running
    # 中断检测：随时按 F8 结束
    if keyboard.is_pressed(STOP_HOTKEY):
        print(f"\n检测到 {STOP_HOTKEY}，程序即将停止监听。")
        running = False
        return False  # 停止监听鼠标

    # 只在“按下左键”的瞬间触发
    # if not pressed and button == mouse.Button.left:
        # print("检测到鼠标左键点击，执行一次粘贴+剪切流程……")
    do_one_cycle()

    # 返回 True 继续监听
    return True


def main():
    global running
    print("说明：")
    print("1. 请先人工完成：在原窗口选中第一条要剪切的数据。")
    print("2. 手动 Alt+Tab 切到目标输入页面，鼠标放在第一个输入框上。")
    print("3. 然后运行本程序。")
    print("4. 之后每点一次鼠标左键，程序就自动：Ctrl+V → Alt+Tab → Ctrl+X → Alt+Tab。")
    print(f"5. 随时按 [{STOP_HOTKEY}] 可中止程序。")
    # time.sleep(3)

    # 开始监听鼠标
    global start
    # with mouse.Listener(on_click=on_click) as listener:
    while running:
        if keyboard.is_pressed(START_HOTKEY):
            start = True
            print(f"\n检测到 {START_HOTKEY}，程序开始运行")
        # 随时检查中断热键
        if keyboard.is_pressed(STOP_HOTKEY):
            print(f"\n检测到 {STOP_HOTKEY}，程序正在停止……")
            running = False
            # listener.stop()
            break
        if start:
            on_click()
        time.sleep(0.1)

    print("程序已结束。")


if __name__ == "__main__":
    main()