"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 3) Import Font Awesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faCircleInfo,
} from '@awesome.me/kit-237330da78/icons/classic/regular';

export function ThreeSixtyImage() {
  const containerRef = useRef(null);
  const animationFrameId = useRef(null);

  // Store the [x, y] screen position of the icon
  const [iconPos, setIconPos] = useState({ x: 0, y: 0 });

  // Whether to show the text label
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Scene ---
    const scene = new THREE.Scene();

    // --- 2. Camera ---
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 0.1); // inside sphere

    // --- 3. Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // --- 4. Inverted sphere (360 image) ---
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/blog/360-image-implementation/test.JPEG", (texture) => {
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const sphereMesh = new THREE.Mesh(geometry, material);
      scene.add(sphereMesh);
    });

    // --- 5. OrbitControls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = -0.2;

    // (Optional) override handleMouseMoveRotate
    if (typeof controls.handleMouseMoveRotate === "function") {
      const originalFunc = controls.handleMouseMoveRotate;
      controls.handleMouseMoveRotate = function (event) {
        this.rotateEnd.set(event.clientX, event.clientY);
        this.rotateDelta
          .subVectors(this.rotateEnd, this.rotateStart)
          .multiplyScalar(this.rotateSpeed);

        const element = this.domElement;
        this.rotateLeft(
          -((2 * Math.PI * this.rotateDelta.x) / element.clientHeight)
        );
        this.rotateUp((2 * Math.PI * this.rotateDelta.y) / element.clientHeight);
        this.rotateStart.copy(this.rotateEnd);
      };
    }

    // >>> 6. We do NOT add any 3D mesh or sprite for the icon <<<
    // We'll just position an HTML overlay at this 3D coordinate:
    const icon3DPos = new THREE.Vector3(0, 0, -200);

    // --- 7. Animation loop ---
    function animate() {
      controls.update();
      renderer.render(scene, camera);
      updateIconPosition();
      animationFrameId.current = requestAnimationFrame(animate);
    }
    animate();

    // Helper: project the 3D point to 2D screen coords
    function updateIconPosition() {
      const vector = icon3DPos.clone();
      vector.project(camera);

      const rect = renderer.domElement.getBoundingClientRect();
      const x = (vector.x * 0.5 + 0.5) * rect.width + rect.left;
      const y = (-vector.y * 0.5 + 0.5) * rect.height + rect.top;

      setIconPos({ x, y });
    }

    // --- 8. Handle Resize ---
    function handleResize() {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener("resize", handleResize);

    // --- 9. Cleanup ---
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // ----- 10. Render the HTML Overlays -----
  return (
    <div style={{ position: "relative" }}>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "80vh",
          overflow: "hidden",
        }}
      />

      {/* The FontAwesome icon pinned to iconPos */}
      <div
        style={{
          position: "absolute",
          left: iconPos.x,
          top: iconPos.y,
          transform: "translate(-50%, -50%)",
          cursor: "pointer",
          pointerEvents: "auto", // allow clicks
        }}
        onClick={() => setShowLabel(!showLabel)}
      >
        <FontAwesomeIcon icon={faCircleInfo} size="2x" color="#00bfff" />
      </div>

      {/* The text label, displayed just above the icon when showLabel is true */}
      {showLabel && (
        <div
          style={{
            position: "absolute",
            left: iconPos.x,
            top: iconPos.y - 40, // ~40px above the icon
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "4px",
            pointerEvents: "none", // let clicks go through
          }}
        >
          This is a point!
        </div>
      )}
    </div>
  );
}
















///blog/360-image-implementation/test.JPEG


// "use client";
//
// import { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//
// export function ThreeSixtyImage() {
//     const containerRef = useRef(null);
//     const animationFrameId = useRef(null);
//
//     useEffect(() => {
//         const container = containerRef.current;
//         if (!container) return;
//
//         // 1. Scene
//         const scene = new THREE.Scene();
//
//         // 2. Camera
//         const camera = new THREE.PerspectiveCamera(
//             75,
//             container.clientWidth / container.clientHeight,
//             0.1,
//             1000
//         );
//         // Placed just inside the sphere
//         camera.position.set(0, 0, 0.1);
//
//         // 3. Renderer
//         const renderer = new THREE.WebGLRenderer({ antialias: true });
//         renderer.setSize(container.clientWidth, container.clientHeight);
//         container.appendChild(renderer.domElement);
//
//         // 4. Sphere (inverted so we see inside)
//         const geometry = new THREE.SphereGeometry(500, 60, 40);
//         geometry.scale(-1, 1, 1);
//
//         // 5. Load the 360 Texture
//         const textureLoader = new THREE.TextureLoader();
//         textureLoader.load("/blog/360-image-implementation/test.JPEG", (texture) => {
//             const material = new THREE.MeshBasicMaterial({ map: texture });
//             const sphereMesh = new THREE.Mesh(geometry, material);
//             scene.add(sphereMesh);
//         });
//
//         // 6. Orbit Controls
//         const controls = new OrbitControls(camera, renderer.domElement);
//         controls.enableZoom = false;
//         controls.enablePan = false;
//         controls.rotateSpeed = -.2;
//
//         // --- OVERRIDE the internal mouse rotation method ---
//         if (typeof controls.handleMouseMoveRotate === "function") {
//             const originalFunc = controls.handleMouseMoveRotate;
//             controls.handleMouseMoveRotate = function (event) {
//                 // 1. replicate the usual pointer logic
//                 this.rotateEnd.set(event.clientX, event.clientY);
//                 this.rotateDelta
//                     .subVectors(this.rotateEnd, this.rotateStart)
//                     .multiplyScalar(this.rotateSpeed);
//
//                 const element = this.domElement;
//
//                 // 2. **Flip horizontal** by passing the negative X delta
//                 this.rotateLeft(
//                     -((2 * Math.PI * this.rotateDelta.x) / element.clientHeight)
//                 );
//
//                 // 3. Keep vertical as normal
//                 this.rotateUp((2 * Math.PI * this.rotateDelta.y) / element.clientHeight);
//
//                 this.rotateStart.copy(this.rotateEnd);
//             };
//         } else {
//             console.warn(
//                 "handleMouseMoveRotate() not found on OrbitControls. " +
//                     "Update your three.js or use a custom approach."
//             );
//         }
//
//         // 7. (Optional) Raycasting for annotations
//         const raycaster = new THREE.Raycaster();
//         const mouse = new THREE.Vector2();
//
//         function onClick(e) {
//             const rect = renderer.domElement.getBoundingClientRect();
//             mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
//             mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
//
//             raycaster.setFromCamera(mouse, camera);
//             const intersects = raycaster.intersectObjects(scene.children, true);
//             if (intersects.length > 0) {
//                 const point = intersects[0].point;
//
//                 // Example: place a small pin sprite
//                 const pinTexture = new THREE.TextureLoader().load("/images/pin-icon.png");
//                 const spriteMat = new THREE.SpriteMaterial({ map: pinTexture });
//                 const sprite = new THREE.Sprite(spriteMat);
//                 sprite.position.copy(point);
//                 sprite.scale.set(10, 10, 1);
//                 scene.add(sprite);
//             }
//         }
//
//         renderer.domElement.addEventListener("click", onClick);
//
//         // 8. Animation / Render Loop
//         function animate() {
//             controls.update();
//             renderer.render(scene, camera);
//             animationFrameId.current = requestAnimationFrame(animate);
//         }
//         animate();
//
//         // 9. Handle Resize
//         function handleResize() {
//             if (!container) return;
//             camera.aspect = container.clientWidth / container.clientHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(container.clientWidth, container.clientHeight);
//         }
//         window.addEventListener("resize", handleResize);
//
//         // Cleanup on unmount
//         return () => {
//             if (animationFrameId.current) {
//                 cancelAnimationFrame(animationFrameId.current);
//             }
//             renderer.domElement.removeEventListener("click", onClick);
//             window.removeEventListener("resize", handleResize);
//
//             if (container && renderer.domElement) {
//                 container.removeChild(renderer.domElement);
//             }
//             renderer.dispose();
//         };
//     }, []);
//
//     return (
//         <div
//             ref={containerRef}
//             style={{
//                 width: "100%",
//                 height: "80vh",
//                 position: "relative",
//                 overflow: "hidden",
//             }}
//         />
//     );
// }
//
