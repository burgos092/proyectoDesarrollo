import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html'
})

export class ProductoListaComponent {
  productos: Producto[];

  constructor(private productoServicio: ProductoService,
    private enrutador: Router){}
  
  ngOnInit(){
    //Cargamos los productos
    this.obtenerProductos();
  }

  private obtenerProductos(){
    // Consumir los datos del observable (suscribirnos)
    this.productoServicio.obtenerProductosLista().subscribe(
      (datos => {
        this.productos = datos;
      })
    );
  }

  editarProducto(id: number){
    this.enrutador.navigate(['editar-producto', id]);
  }

  eliminarProducto(id: number){
    this.productoServicio.eliminarProducto(id).subscribe(
      {
        next: (datos) => this.obtenerProductos(),
        error: (errores) => console.log(errores)
      }
    );
  }

  descargarReportePDF(): void {
    const doc = new jsPDF();
  
    // Título del reporte
    doc.setFontSize(16);
    doc.text('Reporte de Productos', 10, 10);
  
    // Configurar la tabla
    let y = 30; // Posición inicial en el eje Y
    doc.setFontSize(12);
    doc.text('ID', 10, y);
    doc.text('Descripción', 40, y);
    doc.text('Precio', 100, y);
    doc.text('Existencias', 140, y);
  
    y += 10; // Mover hacia abajo
  
    // Llenar la tabla con datos
    this.productos.forEach((producto) => {
      doc.text(`${producto.idProducto}`, 10, y);
      doc.text(`${producto.descripcion}`, 40, y);
      doc.text(`$${producto.precio}`, 100, y);
      doc.text(`${producto.existencia}`, 140, y);
      y += 10; // Incrementar la posición Y para la siguiente fila
    });
  
    // Guardar el PDF
    doc.save('reporte_productos.pdf');
  }

  descargarReporteExcel(): void {
    // Datos de ejemplo (puedes usar los datos de tu tabla)
    const datos = this.productos.map((producto) => ({
      ID: producto.idProducto,
      Descripción: producto.descripcion,
      Precio: producto.precio,
      Existencias: producto.existencia,
    }));
  
    // Crear una hoja de cálculo
    const hoja = XLSX.utils.json_to_sheet(datos);
  
    // Crear un libro de trabajo
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, 'Productos');
  
    // Exportar a Excel
    XLSX.writeFile(libro, 'reporte_productos.xlsx');
  }

}
