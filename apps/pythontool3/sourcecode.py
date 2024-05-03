from PIL import Image, ImageDraw
from svgwrite import Drawing, rgb
from art import tprint
import numpy as np
import logging
import time
import tqdm
import os

os.system("cls")

def image_to_text_svg(input_image_path, output_svg_path, text_size, use_advanced_characters):
    """
    Convert an image to SVG format using text characters.

    Args:
        input_image_path (str): Path to the input image file.
        output_svg_path (str): Path to save the output SVG file.
        text_size (int): Font size for text characters.
        use_advanced_characters (bool): Whether to use advanced characters.

    Returns:
        None
    """
    img = Image.open(input_image_path)
    width, height = img.size
    img_gray = img.convert('L')

    dwg = Drawing(output_svg_path, size=(width, height))

    if use_advanced_characters:
        characters = "1234567890#@$&%#*^+><=-~:;,.!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    else:
        characters = "1234567890"

    grayscale_values = np.array(img_gray)
    characters_sorted = sorted(characters, key=lambda char: ord(char))

    total_iterations = (height // text_size) * (width // text_size)

    logging.info("Starting CGV-SVG conversion")

    progress_bar = tqdm.tqdm(total=total_iterations, desc="Converting image to CGV-SVG", unit="pixels")

    for y in range(0, height, text_size):
        for x in range(0, width, text_size):
            grayscale_value = grayscale_values[y, x]
            character = characters_sorted[int(grayscale_value / 255 * (len(characters_sorted) - 1))]
            dwg.add(dwg.text(character, insert=(x, y), fill=rgb(grayscale_value, grayscale_value, grayscale_value), font_family="Arial", font_size=text_size))

            progress_bar.update(1)

    progress_bar.close()

    time.sleep(1)

    logging.info("CGV-SVG conversion complete")
    logging.warning("Saving may take a few minutes depending on image size.")

    progress_bar_save = tqdm.tqdm(total=1, desc="Saving CGV-SVG file to output")
    dwg.saveas(output_svg_path)
    progress_bar_save.update(1)
    progress_bar_save.close()

    logging.info("CGV-SVG saving complete.")
    logging.info("CGV-SVG conversion and saving complete.")
    logging.info("Program finished, you can close the window now.")

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    
    tprint("Image To Text-SVG")
    
    print("Input Path. (File Must Exist) For example: 'C:/Users/user/Downloads/coolpicture.jpg'")
    input_image_path = input("Input Image Path > ")
    print("Output Path. (File To Create) For example: 'C:/Users/user/Downloads/svg-coolpicture.svg'")
    output_image_path = input("Output Image Path > ")
    print("The font size in the output SVG will mirror the size of each pixel (character). Opting for a smaller font size yields higher quality but significantly increases file size. I suggest selecting a size within the range of 5-10 for optimal results.")
    font_size = input("Font Size (1-100) > ")
    print("Advanced characters can amplify detail, but it may come at the cost of larger file sizes and reduced overall quality. It's recommended to avoid using advanced characters unless you're converting an image with minimal shading and detail.")
    use_advanced_characters = input("Use advanced characters? (Y/N) > ")
    
    if use_advanced_characters.lower() == "y":
        use_advanced_characters = True
    else:
        use_advanced_characters = False

    try:
        if not font_size:
            font_size = 10
        else:
            font_size = int(font_size)
            if font_size < 1 or font_size > 100:
                logging.error("Font size must be between 1 and 100.")
                exit(1)
    except ValueError:
        logging.error("Invalid font size provided. Please provide a valid integer.")
        exit(1)

    output_svg_path = output_image_path

    if not os.path.exists(input_image_path):
        logging.error("Input image file not found.")
        exit(1)

    if os.path.exists(output_svg_path):
        os.remove(output_svg_path)

    logging.info("Starting Program")
    logging.info("PLEASE DO NOT CLOSE THIS WINDOW UNTIL THE PROCESS HAS ENDED OR YOU'RE INSTRUCTED OTHERWISE.")

    time.sleep(1)

    image_to_text_svg(input_image_path, output_svg_path, font_size, use_advanced_characters)