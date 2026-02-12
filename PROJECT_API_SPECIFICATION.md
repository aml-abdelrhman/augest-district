# Hemma Project - API & Database Specification (Laravel)

This document provides the necessary details for backend developers to implement the API and database schema for the Project management system.

## Data Types

### Translatable Fields (`LocaleText`)
The frontend uses a standard object for translatable strings:
```typescript
{
  ar: string; // Arabic content
  en: string; // English content
}
```
**Laravel Recommendation:** Use the `spatie/laravel-translatable` package to handle these fields in the database as JSON columns.

---

## Models

### 1. Project
The core entity representing a real estate project.

| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | Integer | Primary Key |
| `title` | `LocaleText` | Project name (Translatable) |
| `description` | `LocaleText` | Detailed description (Translatable) |
| `price_from` | String | Starting price (e.g., "1,290,000") |
| `city` | `LocaleText` | City and Neighborhood (Translatable) |
| `area` | String | Area range (e.g., "215 - 215 m²") |
| `rooms` | String | Room range (e.g., "3 - 3") |
| `unit_types` | `LocaleText` | Types of units available (e.g., "Apartments", "Villas") |
| `status` | Enum | One of: `available`, `sold`, `reserved` |
| `project_file_link` | URL/String | Link to project brochure/PDF |
| `project_phone_link` | String | Phone number or click-to-call link |
| `project_questions_link`| String | WhatsApp/Contact link for inquiries |
| `features` | Array of `LocaleText` | List of characteristics (e.g., ["Elevators", "Roof"]) |
| `gallery` | Array of Strings | List of image URLs for the photo gallery |
| `diagrams` | Array of Strings | List of image URLs for project floor plans/diagrams |

#### Project Relationships
- **Guarantees**: Has Many (e.g., "Plumbing - 10 years")
- **Near To**: Has One (Includes a background image and a list of locations)
- **Units**: Has Many (Detailed individual unit info)

### 2. Unit
Individual units within a project.

| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | Integer | Primary Key |
| `project_id` | Integer | Foreign Key to Projects |
| `unit_number` | String | Unit identifier (e.g., "#B1") |
| `title` | String | Unit title |
| `description` | String | Unit description |
| `image` | String | Main unit image URL |
| `status` | Enum | One of: `available`, `sold`, `reserved` |
| `price` | String | Specific unit price |
| `floor` | String | Floor number |
| `area` | String | Unit area |
| `rooms` | Integer | Number of rooms |

### 3. Near To (Location Group)
Used to show proximity to landmarks.

| Property | Type | Description |
| :--- | :--- | :--- |
| `img` | String | Background image for the Map/Near section |
| `locations` | Array of Objects | List of nearby places |

**Location Object:**
- `name`: `LocaleText` (Translatable)
- `distance`: Integer (**Minutes**) - See Best Practices below.

### 4. Guarantee

| Property | Type | Description |
| :--- | :--- | :--- |
| `title` | `LocaleText` | What is guaranteed (Translatable) |
| `years` | Integer | Duration in years |

---

## Best Practices & Handling Durations

### Distances and Durations (Best Option)
For fields like `distance` (in "Near To" section) and `years` (in "Guarantees"):

1. **Backend stores an Integer**: For example, store `3` for 3 minutes.
2. **Frontend handles Display**: The frontend uses internationalization libraries to display "3 minutes" in English or "٣ دقائق" in Arabic based on the number.

**Advantages:**
- **Ease for Admin**: The admin dashboard only needs a single numeric input field.
- **Perfect Translation**: Automatic handling of pluralization (e.g., 1 minute vs 2 minutes).

---

## API Implementation Notes (Laravel)

### 1. Resource Response
When fetching a project detail, the API should return a nested JSON structure that matches the `Project` TypeScript interface.

**Example Endpoint:** `GET /api/projects/{id}`

**Example Payload:**
```json
{
  "id": 1,
  "title": { "ar": "مشروع حي العارض", "en": "Al Arid Project" },
  "status": "available",
  "near_to": {
    "img": "/images/map-bg.svg",
    "locations": [
      {
        "name": { "ar": "طريق الملك سلمان", "en": "King Salman Road" },
        "distance": 3
      }
    ]
  },
  "units": [
    {
      "id": 101,
      "unit_number": "#A01",
      "status": "available"
      // ... rest of unit properties
    }
  ]
}
```

### 2. Validation
- Ensure `status` fields only accept the defined enum values.
- Validate URLs for `gallery`, `diagrams`, and `project_file_link`.

### 3. File Handling
Recommend using Laravel Media Library (Spatie) for handling the `gallery` and `diagrams` to easily manage image conversions and storage.
