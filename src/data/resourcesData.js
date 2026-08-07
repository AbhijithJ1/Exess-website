/**
 * ExESS Technical Resources & Learning Vault Data
 */
import { BookOpen, Code, Cpu, Download, FileCode, Layers, ShieldCheck, Terminal } from 'lucide-react'

export const resourcesData = [
  {
    id: 'res-kicad-guide',
    title: 'KiCad 8 PCB Layout Starter Guide',
    description: 'Comprehensive step-by-step guide for routing 2-layer and 4-layer printed circuit boards, calculating trace widths for current capacity, and exporting Gerber manufacturing packages.',
    category: 'PCB Design',
    format: 'PDF Guide',
    icon: Layers,
    fileSize: '4.2 MB',
    downloads: '1.2k',
    url: '#',
  },
  {
    id: 'res-stm32-baremetal',
    title: 'STM32 Bare-Metal Peripheral Drivers',
    description: 'Complete C code repository demonstrating CMSIS register-level configuration for GPIO, USART, SPI, I2C, Timers, and DMA controllers on ARM Cortex-M microcontrollers.',
    category: 'Embedded C',
    format: 'GitHub Repo',
    icon: Code,
    fileSize: '18 MB',
    downloads: '850+',
    url: '#',
  },
  {
    id: 'res-verilog-cheatsheet',
    title: 'Verilog HDL Synthesizable Design Cheatsheet',
    description: 'Reference sheet covering synthesizable RTL constructs, finite state machine (FSM) templates, clock domain crossing (CDC) synchronizers, and testbench constructs.',
    category: 'VLSI & FPGA',
    format: 'Cheatsheet',
    icon: Cpu,
    fileSize: '1.8 MB',
    downloads: '2.1k',
    url: '#',
  },
  {
    id: 'res-dsp-matlab',
    title: 'DSP Filter Design & Spectral Analysis Scripts',
    description: 'Collection of MATLAB & Python Jupyter notebooks for FIR/IIR filter design, windowing functions, FFT spectral estimation, and real-time audio signal processing.',
    category: 'Signal Processing',
    format: 'Notebooks',
    icon: Terminal,
    fileSize: '8.5 MB',
    downloads: '640+',
    url: '#',
  },
]

export const labEquipment = [
  { name: 'Tektronix 100MHz Digital Storage Oscilloscopes', count: '12 Units' },
  { name: 'Keysight 3GHz Spectrum Analyzer', count: '1 Unit' },
  { name: 'Xilinx Artix-7 & Zynq-7000 FPGA Development Boards', count: '15 Units' },
  { name: 'Temperature-Controlled SMD Soldering & Rework Stations', count: '8 Stations' },
  { name: 'Siglent Dual-Channel Arbitrary Waveform Generators', count: '10 Units' },
  { name: 'Precision LCR Meter & Component Analyzers', count: '4 Units' },
]
