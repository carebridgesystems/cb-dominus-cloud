"""
Token Mapping Service - Manages token to project mapping
Reads from and writes to config/token_mappings.json
"""
import json
import os
from typing import Dict, Optional, Any
from pathlib import Path


TOKEN_MAPPINGS_FILE = os.path.join(
    os.path.dirname(__file__),
    "..",
    "..",
    "..",
    "config",
    "token_mappings.json"
)


def _ensure_config_dir():
    """Ensure config directory exists"""
    config_dir = os.path.dirname(TOKEN_MAPPINGS_FILE)
    os.makedirs(config_dir, exist_ok=True)


def _read_mappings() -> Dict[str, Dict[str, Any]]:
    """
    Read token mappings from file.
    
    Returns:
        Dict mapping token -> {project_slug, environment, project_id}
    """
    _ensure_config_dir()
    
    if not os.path.exists(TOKEN_MAPPINGS_FILE):
        # Return empty dict if file doesn't exist
        return {}
    
    try:
        with open(TOKEN_MAPPINGS_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data if isinstance(data, dict) else {}
    except (json.JSONDecodeError, IOError) as e:
        # Return empty dict on error
        return {}


def _write_mappings(mappings: Dict[str, Dict[str, Any]]) -> bool:
    """
    Write token mappings to file.
    
    Args:
        mappings: Dict mapping token -> {project_slug, environment, project_id}
        
    Returns:
        True if successful
    """
    _ensure_config_dir()
    
    try:
        # Write to temp file first, then rename (atomic operation)
        temp_file = f"{TOKEN_MAPPINGS_FILE}.tmp"
        with open(temp_file, 'w', encoding='utf-8') as f:
            json.dump(mappings, f, indent=2, ensure_ascii=False)
        
        # Atomic rename
        os.replace(temp_file, TOKEN_MAPPINGS_FILE)
        return True
    except Exception as e:
        # Clean up temp file on error
        temp_file = f"{TOKEN_MAPPINGS_FILE}.tmp"
        if os.path.exists(temp_file):
            try:
                os.remove(temp_file)
            except:
                pass
        raise RuntimeError(f"Failed to write token mappings: {str(e)}") from e


def get_project_by_token(token: str) -> Optional[Dict[str, Any]]:
    """
    Get project mapping for a token.
    
    Args:
        token: Token string (hex format, not base64)
        
    Returns:
        Dict with project_slug, environment, project_id, or None if not found
    """
    mappings = _read_mappings()
    return mappings.get(token)


def add_token_mapping(token: str, project_slug: str, environment: str, project_id: str) -> bool:
    """
    Add a new token mapping.
    
    Args:
        token: Token string (hex format)
        project_slug: Project slug
        environment: Environment (development, staging, or production)
        project_id: Infisical project ID
        
    Returns:
        True if successful
    """
    mappings = _read_mappings()
    mappings[token] = {
        "project_slug": project_slug,
        "environment": environment,
        "project_id": project_id
    }
    return _write_mappings(mappings)


def remove_token_mapping(token: str) -> bool:
    """
    Remove a token mapping.
    
    Args:
        token: Token string to remove
        
    Returns:
        True if successful, False if token not found
    """
    mappings = _read_mappings()
    if token not in mappings:
        return False
    
    del mappings[token]
    return _write_mappings(mappings)


def list_all_mappings() -> Dict[str, Dict[str, Any]]:
    """
    Get all token mappings.
    
    Returns:
        Dict mapping token -> {project_slug, environment, project_id}
    """
    return _read_mappings()

