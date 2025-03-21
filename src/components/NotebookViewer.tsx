
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface NotebookViewerProps {
  summaryImage?: string;
}

const NotebookViewer: React.FC<NotebookViewerProps> = ({ summaryImage }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 0, 5);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 1.5;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create notebook
    const notebookGroup = new THREE.Group();
    scene.add(notebookGroup);
    
    // Create notebook cover
    const coverGeometry = new THREE.BoxGeometry(4, 5, 0.2);
    const coverMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x2266aa,
      roughness: 0.7,
      metalness: 0.1
    });
    const cover = new THREE.Mesh(coverGeometry, coverMaterial);
    notebookGroup.add(cover);
    
    // Create notebook pages
    const createPage = (index: number, total: number) => {
      const pageGeometry = new THREE.PlaneGeometry(3.8, 4.8);
      
      let pageMaterial;
      
      // Use the summary image for the first page if available
      if (index === 0 && summaryImage) {
        const texture = new THREE.TextureLoader().load(summaryImage);
        pageMaterial = new THREE.MeshBasicMaterial({ 
          map: texture,
          side: THREE.DoubleSide
        });
      } else {
        // Create lined paper texture
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 640;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Background
          ctx.fillStyle = '#FEF7CD';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Horizontal lines
          ctx.strokeStyle = '#FDE1D3';
          ctx.lineWidth = 1;
          
          for (let y = 24; y < canvas.height; y += 24) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
          }
          
          // Vertical margin line
          ctx.strokeStyle = 'rgba(255, 0, 0, 0.2)';
          ctx.beginPath();
          ctx.moveTo(40, 0);
          ctx.lineTo(40, canvas.height);
          ctx.stroke();
          
          // Add some fake text if not the first page
          if (index > 0) {
            ctx.fillStyle = '#555';
            ctx.font = '14px Courier, monospace';
            
            const lines = [
              "Notes from class:",
              "• Important concept",
              "• Remember to review",
              "• Study for next week",
              "• Ask questions",
            ];
            
            lines.forEach((line, i) => {
              ctx.fillText(line, 50, 50 + i * 30);
            });
          }
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        pageMaterial = new THREE.MeshBasicMaterial({ 
          map: texture,
          side: THREE.DoubleSide
        });
      }
      
      const page = new THREE.Mesh(pageGeometry, pageMaterial);
      
      // Position the page slightly above the cover
      const offset = 0.1 + (index * 0.01);
      page.position.z = offset;
      
      return page;
    };
    
    // Add multiple pages
    for (let i = 0; i < 5; i++) {
      const page = createPage(i, 5);
      notebookGroup.add(page);
    }
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of geometries and materials
      coverGeometry.dispose();
      coverMaterial.dispose();
      
      // Dispose of renderer
      renderer.dispose();
    };
  }, [summaryImage]);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-[400px] rounded-lg overflow-hidden"
      aria-label="3D Notebook Visualization"
    />
  );
};

export default NotebookViewer;
