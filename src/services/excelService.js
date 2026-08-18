import * as XLSX from 'xlsx';

// Import local sample images
import accessoriesImg from '../assets/img/accessories_sample.png';
import olCoffeeImg from '../assets/img/olcoffee_sample.png';
import olMachineImg from '../assets/img/olmachine_sample.png';
import vlCoffeeImg from '../assets/img/vlcoffee_sample.png';
import vlMachineImg from '../assets/img/vlmachine_sample.png';

// Fallback map for catalogs
const catalogSampleImages = {
  'Accessories': accessoriesImg,
  'OL Coffee': olCoffeeImg,
  'VL Coffee': vlCoffeeImg,
  'OL Machine': olMachineImg,
  'VL Machine': vlMachineImg,
  'B2B Coffee': olCoffeeImg,
  'B2B Machine': olMachineImg
};

export async function fetchMasterData() {
  const response = await fetch('/MasterData.xlsx');
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const rawData = XLSX.utils.sheet_to_json(worksheet);

  return rawData.map(row => {
    const catalog = row['Catalog'] ? String(row['Catalog']).trim() : '';
    const excelImage = row['Image URL'] || row['Image'] || null;

    // Use explicit Excel image URL if available, otherwise default to designated sample image
    const finalImage = excelImage || catalogSampleImages[catalog] || accessoriesImg;

    return {
      id: String(row['Product ID'] || ''),
      name: row['Product Name'] || '',
      collection: row['Collection'] || '',
      category: row['Category'] || '',
      dimension: row['Dimension'] || '',
      viewType: row['View Type'] || '',
      fileType: row['File Type'] || '',
      capacity: row['Capacity'] || '',
      color: row['Color'] || '',
      catalog: catalog,
      keywords: row['Keywords'] ? String(row['Keywords']).split(',').map(k => k.trim()) : [],
      image: finalImage
    };
  });
}