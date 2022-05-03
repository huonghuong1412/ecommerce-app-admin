import jsPDF from 'jspdf'
export default function pdf({data, headers, filename}) {
    const doc = new jsPDF({
        orientation: '1',
        unit: 'px',
        format: 'a4'
    })
    doc.save(filename);
}
