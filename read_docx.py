import zipfile
import xml.etree.ElementTree as ET
import sys

def extract_text(path):
    try:
        with zipfile.ZipFile(path) as docx:
            xml_content = docx.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            texts = []
            for elem in tree.iterfind('.//w:p', namespaces):
                para_text = []
                for t in elem.iterfind('.//w:t', namespaces):
                    if t.text:
                        para_text.append(t.text)
                if para_text:
                    texts.append(''.join(para_text))
            
            with open('extracted_template.md', 'w', encoding='utf-8') as f:
                f.write('\n'.join(texts))
            print("Successfully extracted to extracted_template.md")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        extract_text(sys.argv[1])
    else:
        print("Please provide a path to the docx file")
