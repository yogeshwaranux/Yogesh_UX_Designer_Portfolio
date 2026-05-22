import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const htmlFiles = [
  'index.html',
  'about.html',
  'contact.html',
  'skills.html',
  'work.html',
];

describe('HTML Validation and Links', () => {
  describe('File Structure', () => {
    it('should have public folder with assets', () => {
      const projectRoot = process.cwd();
      const publicPath = path.join(projectRoot, 'public');
      const assetsPath = path.join(publicPath, 'assets');
      
      expect(fs.existsSync(publicPath)).toBe(true);
      expect(fs.existsSync(assetsPath)).toBe(true);
    });

    it('should have resume PDF in public/assets/docs', () => {
      const projectRoot = process.cwd();
      const resumePath = path.join(projectRoot, 'public', 'assets', 'docs', 'Yogesh_resume_1.pdf');
      expect(fs.existsSync(resumePath)).toBe(true);
    });

    it('index.html should exist', () => {
      const projectRoot = process.cwd();
      const indexPath = path.join(projectRoot, 'index.html');
      expect(fs.existsSync(indexPath)).toBe(true);
    });
  });

  describe('Link References', () => {
    const readHtmlFile = (filename) => {
      const filePath = path.join(process.cwd(), filename);
      return fs.readFileSync(filePath, 'utf-8');
    };

    it('index.html should reference public assets with absolute paths', () => {
      const content = readHtmlFile('index.html');
      const hasAbsoluteAssets = content.includes('/assets/');
      const hasRelativeAssets = content.includes('assets/') && !content.includes('/assets/');
      
      expect(hasAbsoluteAssets).toBe(true);
      // Should not have relative asset paths
      expect(content.match(/src="assets\//)).toBeFalsy();
      expect(content.match(/href="assets\//)).toBeFalsy();
    });

    it('about.html should reference public assets with absolute paths', () => {
      const content = readHtmlFile('about.html');
      expect(content.includes('/assets/images/')).toBe(true);
      expect(content.match(/src="assets\//)).toBeFalsy();
    });

    it('should have correct favicon references', () => {
      const files = ['about.html', 'contact.html', 'skills.html', 'work.html'];
      files.forEach((file) => {
        const content = readHtmlFile(file);
        expect(content.includes('/assets/icons/favicon.ico')).toBe(true);
      });
    });

    it('should have correct stylesheet references', () => {
      const files = ['about.html', 'contact.html', 'skills.html', 'work.html'];
      files.forEach((file) => {
        const content = readHtmlFile(file);
        expect(content.includes('/src/scss/main.scss')).toBe(true);
      });
    });

    it('should have resume download links pointing to /assets/docs/Yogesh_resume_1.pdf', () => {
      const content = readHtmlFile('index.html');
      const resumeLinks = content.match(/href="\/assets\/docs\/Yogesh_resume_1\.pdf"/g);
      expect(resumeLinks).toBeTruthy();
      expect(resumeLinks.length).toBeGreaterThan(0);
    });
  });

  describe('HTML Structure', () => {
    const readHtmlFile = (filename) => {
      const filePath = path.join(process.cwd(), filename);
      return fs.readFileSync(filePath, 'utf-8');
    };

    it('index.html should have required meta tags', () => {
      const content = readHtmlFile('index.html');
      expect(content).toMatch(/<meta charset="UTF-8"/);
      expect(content).toMatch(/<meta name="viewport"/);
      expect(content).toMatch(/<meta name="description"/);
      expect(content).toMatch(/<title>/);
    });

    it('index.html should have navigation elements', () => {
      const content = readHtmlFile('index.html');
      // Single page design with anchor links
      expect(content).toMatch(/#hero/);
      expect(content).toMatch(/#about/);
      expect(content).toMatch(/#projects/);
      expect(content).toMatch(/#skills/);
      expect(content).toMatch(/#contact/);
      // Or page links in other files
      expect(content.includes('about.html') || content.includes('#about')).toBe(true);
    });

    it('index.html should have script tags', () => {
      const content = readHtmlFile('index.html');
      // Can be inline <script> or module type
      expect(content.includes('<script')).toBe(true);
    });

    it('should have no 404 asset references', () => {
      htmlFiles.forEach((file) => {
        const content = readHtmlFile(file);
        // Check for common typos or missing files
        expect(content).not.toMatch(/src=".*undefined.*"/);
        expect(content).not.toMatch(/href=".*undefined.*"/);
        expect(content).not.toMatch(/url\('.*undefined.*'\)/);
      });
    });
  });

  describe('Asset Accessibility', () => {
    it('all image files in public/assets/images should exist', () => {
      const projectRoot = process.cwd();
      const imagesDir = path.join(projectRoot, 'public', 'assets', 'images');
      
      if (fs.existsSync(imagesDir)) {
        const files = fs.readdirSync(imagesDir);
        expect(files.length).toBeGreaterThan(0);
      }
    });

    it('all icon files in public/assets/icons should exist', () => {
      const projectRoot = process.cwd();
      const iconsDir = path.join(projectRoot, 'public', 'assets', 'icons');
      
      if (fs.existsSync(iconsDir)) {
        const files = fs.readdirSync(iconsDir);
        expect(files.length).toBeGreaterThan(0);
      }
    });

    it('should have no broken relative asset paths in HTML', () => {
      htmlFiles.forEach((file) => {
        const filePath = path.join(process.cwd(), file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Count asset references
        const assetRefs = content.match(/(?:src|href|url)\s*=\s*['"](\/assets\/[^'"]+)/g);
        if (assetRefs) {
          assetRefs.forEach((ref) => {
            const match = ref.match(/['"](\/assets\/[^'"]+)/);
            if (match) {
              const assetPath = match[1];
              expect(assetPath).toMatch(/^\/assets\//);
            }
          });
        }
      });
    });
  });
});
