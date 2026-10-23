import os
import zipfile

def create_zips():
    dist_dir = os.path.abspath('dist')
    zip_targets = [
        'sheharyar-portfolio-production.zip',
        'public_html.zip',
        'portfolio-hostinger.zip'
    ]

    for zip_filename in zip_targets:
        zip_path = os.path.abspath(zip_filename)
        if os.path.exists(zip_path):
            os.remove(zip_path)

        file_count = 0
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(dist_dir):
                for file in files:
                    full_path = os.path.join(root, file)
                    rel_path = os.path.relpath(full_path, dist_dir)
                    unix_arcname = rel_path.replace('\\', '/')
                    zipf.write(full_path, unix_arcname)
                    file_count += 1

        size_mb = os.path.getsize(zip_path) / (1024 * 1024)
        print(f"[+] Created {zip_filename}: {file_count} files ({size_mb:.2f} MB)")

    # Verify critical files
    check_zip = zipfile.ZipFile(os.path.abspath('public_html.zip'))
    names = set(check_zip.namelist())
    critical_files = [
        '.htaccess',
        'index.html',
        'googlef967bff78425d496.html',
        'robots.txt',
        'sitemap.xml',
        'favicon.svg',
        'api/chat.php',
        '.well-known/security.txt'
    ]
    print("\nCritical Hostinger files check:")
    all_ok = True
    for item in critical_files:
        status = "OK" if item in names else "MISSING"
        if status == "MISSING":
            all_ok = False
        print(f"  [{status}] {item}")

    if all_ok:
        print("\nAll critical files verified successfully! Ready for Hostinger upload.")

if __name__ == '__main__':
    create_zips()

